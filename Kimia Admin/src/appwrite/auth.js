import conf from "../conf/conf.js";
import { Client, Account, ID, Databases } from "appwrite";

export class AuthService {
  client = new Client();
  databases;
  account;

  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjetId);
    this.account = new Account(this.client);
    this.databases = new Databases(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      const data = {
        name: userAccount.name,
        email: userAccount.email,
        langage: "français",
        goal: [],
        total_session: 0,
        total_minute: 0,
        role: false,
      };

      const res = await this.databases.createDocument(
        conf.appwriteDataBaseId,
        "users",
        ID.unique(),
        data
      );

      if (userAccount.status === true) {
        return res;
      } else {
        return "ERREUR SURVENUE LORS DE LA CREATION VEILLEZ REESSAYER SVP";
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      // Vérifie la session

      await this.account.deleteSession();
      console.log("DECONNECTER");
      return;
    } catch (e) {
      // Pas connecté → on peut créer la session
      //console.log("CONNECTION");
      return this.account.createEmailPasswordSession({ email, password });
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service :: getCrrent User :: error", error);
    }
    return null;
  }

  async logout() {
    try {
      return await this.account.deleteSession();
    } catch (error) {
      console.log("Appwrite service :: logout :: error", error);
    }
    return null;
  }

  async getAllUsers() {
    try {
      const response = await this.databases.listDocuments(
        conf.appwriteDataBaseId,
        "users"
      );

      //console.log("Utilisateurs :", response.documents);
      return response.documents;
    } catch (error) {
      console.error("Erreur :", error);
    }
  }
}

const authService = new AuthService();
export default authService;
