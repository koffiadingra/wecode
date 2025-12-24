import conf from "../conf/conf.js";
import { Client, Databases, Storage, ID, Account } from "appwrite";

export class MeditationService {
  client = new Client();
  databases;
  storage;
  account;

  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjetId);

    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
    this.account = new Account(this.client);
  }

  async createMeditation(meditationData) {
    try {
      console.log("📤 Données envoyées à Appwrite:", meditationData);

      return await this.databases.createDocument(
        conf.appwriteDataBaseId,
        conf.appwriteCollectionId,
        ID.unique(),
        meditationData
      );
    } catch (error) {
      console.error("Appwrite service :: createMeditation :: error", error);
      console.error("Détails de l'erreur:", error.message);
      console.log(
        "Erreur lors de la création de la méditation : " + error.message
      );
      throw error;
    }
  }

  async getMeditations(queries = []) {
    try {
      const response = await this.databases.listDocuments(
        conf.appwriteDataBaseId,
        conf.appwriteCollectionId,
        queries
      );

      const normalizedMeditations = response.documents.map((doc) => {
        const meditation = {
          $id: doc.$id,
          title: doc.title || "",
          duration: parseInt(doc.duration) || 10,
          category: doc.category || "Mindfulness",
          bucket_audio_id: doc.bucket_audio_id || "",
          audio_id: doc.audio_id,
          language: doc.language || "French",
          instructorType: doc.instructorType || "Female",
          description: doc.description || "",
        };

        // if (meditation.audioUrl) {
        //   meditation.audioDownloadUrl = this.getFileDownload(
        //     meditation.audioUrl
        //   );
        // }

        return meditation;
      });

      return {
        ...response,
        documents: normalizedMeditations,
      };
    } catch (error) {
      console.error("Appwrite service :: getMeditations :: error", error);
      throw error;
    }
  }
  async getFile(bkuId, audId) {
    const rsult = this.storage.getFileDownload(bkuId, audId);
    console.log(rsult);

    return rsult;
  }

  async updateMeditation(documentId, meditationData) {
    try {
      const appwriteData = {
        title: meditationData.title || "",
        duration: meditationData.duration?.toString() || "10",
        category: meditationData.category || "Mindfulness",
        audioUrl: meditationData.audioUrl || "",
        language: meditationData.language || "French",
        instructorType: meditationData.instructorType || "Female",
        description: meditationData.description || "",
      };

      return await this.databases.updateDocument(
        conf.appwriteDataBaseId,
        conf.appwriteCollectionId,
        documentId,
        appwriteData
      );
    } catch (error) {
      console.error("Appwrite service :: updateMeditation :: error", error);
      throw error;
    }
  }

  async deleteMeditation(documentId) {
    try {
      const meditation = await this.databases.getDocument(
        conf.appwriteDataBaseId,
        conf.appwriteCollectionId,
        documentId
      );

      if (meditation.audioUrl) {
        try {
          await this.deleteFile(meditation.audioUrl);
        } catch (error) {
          console.warn("Impossible de supprimer le fichier audio:", error);
        }
      }

      await this.databases.deleteDocument(
        conf.appwriteDataBaseId,
        conf.appwriteCollectionId,
        documentId
      );
      return true;
    } catch (error) {
      console.error("Appwrite service :: deleteMeditation :: error", error);
      throw error;
    }
  }

  async uploadFile(file) {
    try {
      if (!(file instanceof File)) {
        throw new Error("Le fichier doit être une instance de File.");
      }
      return await this.storage.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.error("Appwrite service :: uploadFile :: error", error);
    }
  }

  getFileDownload(buketId, audId) {
    return this.storage.getFileDownload(buketId, audId);
  }

  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.error("Appwrite service :: deleteFile :: error", error);
      throw error;
    }
  }

  async getMeditationById(documentId) {
    try {
      const doc = await this.databases.getDocument(
        conf.appwriteDataBaseId,
        conf.appwriteCollectionId,
        documentId
      );

      const meditation = {
        $id: doc.$id,
        title: doc.title || "",
        duration: parseInt(doc.duration) || 10,
        category: doc.category || "Mindfulness",
        audioUrl: doc.audioUrl || "",
        language: doc.language || "French",
        instructorType: doc.instructorType || "Female",
        description: doc.description || "",
      };

      if (meditation.audioUrl) {
        meditation.audioDownloadUrl = this.getFileDownload(meditation.audioUrl);
      }

      return meditation;
    } catch (error) {
      console.error("Appwrite service :: getMeditationById :: error", error);
      throw error;
    }
  }
}

const meditationService = new MeditationService();
export default meditationService;
