import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Play, Pause } from "lucide-react";
import { NaturalButton } from "../NaturalButton";
import { NaturalInput, NaturalSelect, NaturalTextarea } from "../NaturalInput";
import { NaturalTag } from "../NaturalTag";
import {
  NaturalCard,
  NaturalCardHeader,
  NaturalCardTitle,
  NaturalCardContent,
  NaturalCardFooter,
} from "../NaturalCard";
import { NaturalModal, ConfirmModal } from "../NaturalModal";
import meditationService from "../../appwrite/meditation";

interface Meditation {
  $id: string;
  title: string;
  duration: number;
  category: string;
  bucket_audio_id: string; // ID du fichier dans Storage
  audio_id: string; // ID du fichier dans Storage
  language: string;
  instructorType: string;
  description: string;
}

const categories = ["stress", "sommeil", "focus", "confiance"];

export function MeditationPage() {
  const [meditations, setMeditations] = useState<Meditation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterLanguage, setFilterLanguage] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMeditation, setSelectedMeditation] =
    useState<Meditation | null>(null);
  const [formData, setFormData] = useState<Partial<Meditation>>({});
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const [tit, setTit] = useState("");
  const [cat, setCat] = useState("stress");
  const [dur, setDur] = useState("1");
  const [lang, setLang] = useState("french");
  const [instr, setInstr] = useState("female");
  const [desc, setDesc] = useState("");
  const [audioDownloadUrl, setAudioDownloadUrl] = useState("");

  const fetchMeditations = async () => {
    setLoading(true);
    try {
      const response = await meditationService.getMeditations();
      console.log(response);

      // Les méditations contiennent maintenant audioDownloadUrl
      setMeditations(response.documents as Meditation[]);
    } catch (error) {
      console.error("Failed to fetch meditations:", error);
    } finally {
      setLoading(false);
    }
  };

  const getAudioUrl = async (bkuId: string, audId: string) => {
    console.log(bkuId, audId);

    const url = await meditationService.getFile(bkuId, audId);
    console.log(url);
    setAudioDownloadUrl(url);
  };

  useEffect(() => {
    fetchMeditations();
  }, []);

  const filteredMeditations = meditations.filter((meditation) => {
    const matchesSearch =
      meditation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meditation.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "All" || meditation.category === filterCategory;
    const matchesLanguage =
      filterLanguage === "all" || meditation.language === filterLanguage;
    return matchesSearch && matchesCategory && matchesLanguage;
  });

  const uploadAudioFile = async (file: File) => {
    setUploading(true);
    try {
      const fileId = await meditationService.uploadFile(file);
      const bucketId = fileId.bucketId;
      const id = fileId.$id;
      //console.log(bucketId, id);
      return { bucketId, id };

      //     const url = storage.getFileDownload("YOUR_BUCKET_ID", "YOUR_FILE_ID");
      //   setAudioUrl(url);
      // }, []);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Échec de l'upload du fichier audio");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleAddMeditation = async () => {
    try {
      // Uploader le nouveau fichier audio si fourni
      if (audioFile) {
        const audioFileId = await uploadAudioFile(audioFile);

        if (audioFileId) {
          // Créer la méditation avec l'ID du fichier audio
          const data_meditation = {
            title: tit,
            duration: parseInt(dur),
            category: cat,
            language: lang.toLowerCase(),
            instructor_type: instr,
            description: desc,
            bucket_audio_id: audioFileId.bucketId,
            audio_id: audioFileId.id,
          };

          console.log(data_meditation);

          const ajout = await meditationService.createMeditation(
            data_meditation
          );
        }
      }

      resetForm();
      setIsAddModalOpen(false);
      await fetchMeditations(); // Recharger la liste
    } catch (error) {
      console.error("Add failed:", error);
      console.log("Échec de l'ajout");
    }
  };

  const handleEditMeditation = async () => {
    if (!selectedMeditation) return;
    try {
      // Uploader le nouveau fichier si fourni
      if (audioFile) {
        const audioFileId = await uploadAudioFile(audioFile);
        if (!audioFileId) return;
      }

      await meditationService.updateMeditation(selectedMeditation.$id, {
        title: formData.title || selectedMeditation.title,
        duration: formData.duration || selectedMeditation.duration,
        category: formData.category || selectedMeditation.category,

        language: formData.language || selectedMeditation.language,
        instructorType:
          formData.instructorType || selectedMeditation.instructorType,
        description: formData.description || selectedMeditation.description,
      });

      resetForm();
      setIsEditModalOpen(false);
      await fetchMeditations();
    } catch (error) {
      console.error("Update failed:", error);
      alert("Échec de la modification");
    }
  };

  const handleDeleteMeditation = async () => {
    if (!selectedMeditation) return;

    try {
      await meditationService.deleteMeditation(selectedMeditation.$id);
      setIsDeleteModalOpen(false);
      setSelectedMeditation(null);
      await fetchMeditations();
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Échec de la suppression");
    }
  };

  const resetForm = () => {
    setFormData({});
    setAudioFile(null);
    setSelectedMeditation(null);
  };

  const openEditModal = (meditation: Meditation) => {
    setSelectedMeditation(meditation);
    setFormData(meditation);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (meditation: Meditation) => {
    setSelectedMeditation(meditation);
    setIsDeleteModalOpen(true);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<
      string,
      "success" | "primary" | "secondary" | "warning"
    > = {
      Mindfulness: "success",
      Sleep: "primary",
      Relaxation: "secondary",
      Productivity: "warning",
      Compassion: "success",
    };
    return colors[category] || "secondary";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[var(--terre-brique)]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-[var(--bleu-nuit)] dark:text-[var(--ocre-doux)] mb-2">
            Meditation Library
          </h1>
          <p className="text-muted-foreground">
            Create and manage meditation sessions
          </p>
        </div>
        <NaturalButton
          variant="primary"
          icon={<Plus size={20} />}
          onClick={() => {
            resetForm();
            setIsAddModalOpen(true);
          }}
        >
          Add Meditation
        </NaturalButton>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <NaturalCard
          className="animate-slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total</p>
              <h2 className="text-[var(--bleu-nuit)] dark:text-[var(--ocre-doux)] mt-1">
                {meditations.length}
              </h2>
            </div>
            <span className="text-3xl">🧘</span>
          </div>
        </NaturalCard>

        <NaturalCard
          className="animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Categories</p>
              <h2 className="text-[var(--bleu-nuit)] dark:text-[var(--ocre-doux)] mt-1">
                {categories.length - 1}
              </h2>
            </div>
            <span className="text-3xl">📚</span>
          </div>
        </NaturalCard>

        <NaturalCard
          className="animate-slide-up"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg. Duration</p>
              <h2 className="text-[var(--bleu-nuit)] dark:text-[var(--ocre-doux)] mt-1">
                {meditations.length
                  ? Math.round(
                      meditations.reduce((acc, m) => acc + m.duration, 0) /
                        meditations.length
                    )
                  : 0}{" "}
                min
              </h2>
            </div>
            <span className="text-3xl">⏱️</span>
          </div>
        </NaturalCard>

        <NaturalCard
          className="animate-slide-up"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Languages</p>
              <h2 className="text-[var(--bleu-nuit)] dark:text-[var(--ocre-doux)] mt-1">
                {new Set(meditations.map((m) => m.language)).size}
              </h2>
            </div>
            <span className="text-3xl">🌍</span>
          </div>
        </NaturalCard>
      </div>

      {/* Filters */}
      <NaturalCard>
        <div className="space-y-4">
          <NaturalInput
            type="search"
            placeholder="Search meditations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Play size={20} />}
          />

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilterCategory(category)}
                className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                  filterCategory === category
                    ? "bg-[var(--terre-brique)] text-white shadow-md scale-105"
                    : "bg-[var(--ocre-doux)] dark:bg-[var(--bleu-nuit-light)] text-[var(--bleu-nuit)] dark:text-[var(--ocre-doux)] hover:scale-105"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <NaturalSelect
            value={filterLanguage}
            onChange={(e) => setFilterLanguage(e.target.value)}
            label="Filter by Language"
          >
            <option value="all">All Languages</option>
            <option value="french">French</option>
            <option value="english">English</option>
          </NaturalSelect>
        </div>
      </NaturalCard>

      {/* Meditation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMeditations.map((meditation, index) => (
          <NaturalCard
            key={meditation.$id}
            hoverable
            className="animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <NaturalCardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <NaturalCardTitle>{meditation.title}</NaturalCardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <NaturalTag
                      variant={getCategoryColor(meditation.category)}
                      size="sm"
                    >
                      {meditation.category}
                    </NaturalTag>
                    <NaturalTag variant="success" size="sm">
                      {meditation.duration} min
                    </NaturalTag>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setPlayingId(
                      playingId === meditation.$id ? null : meditation.$id
                    );
                    getAudioUrl(
                      meditation.bucket_audio_id,
                      meditation.audio_id
                    );
                  }}
                  className="p-2 rounded-xl bg-[var(--terre-brique)] text-white hover:bg-[var(--terre-brique-hover)] transition-all hover:scale-110"
                >
                  {playingId === meditation.$id ? (
                    <Pause size={20} />
                  ) : (
                    <Play size={20} />
                  )}
                </button>
              </div>
            </NaturalCardHeader>

            <NaturalCardContent>
              <p className="text-sm text-muted-foreground mb-3">
                {meditation.description}
              </p>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Language</span>
                  <span className="text-[var(--bleu-nuit)] dark:text-[var(--ocre-doux)]">
                    {meditation.language}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Instructor</span>
                  <span className="text-[var(--bleu-nuit)] dark:text-[var(--ocre-doux)]">
                    {meditation.instructorType}
                  </span>
                </div>
              </div>

              {/* 🎧 Lecteur audio utilisant l'URL de téléchargement */}
              {playingId === meditation.$id && (
                <div className="mt-4">
                  <audio
                    controls
                    src={audioDownloadUrl}
                    className="w-full"
                    onPlay={() => setPlayingId(meditation.$id)}
                    onPause={() => setPlayingId(null)}
                  >
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}

              {/* {playingId === meditation.$id && meditation.bucket_audio_id && (
                <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    Aucun fichier audio disponible pour cette méditation.
                  </p>
                </div>
              )} */}
            </NaturalCardContent>

            <NaturalCardFooter>
              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => openEditModal(meditation)}
                  className="p-2 rounded-lg text-[var(--bleu-nuit)] dark:text-[var(--ocre-doux)] hover:bg-[var(--ocre-doux)] dark:hover:bg-[var(--bleu-nuit-light)] transition-colors"
                  aria-label="Edit meditation"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => openDeleteModal(meditation)}
                  className="p-2 rounded-lg text-destructive hover:bg-[var(--ocre-doux)] hover:bg-opacity-10 transition-colors"
                  aria-label="Delete meditation"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </NaturalCardFooter>
          </NaturalCard>
        ))}
      </div>

      {filteredMeditations.length === 0 && (
        <NaturalCard>
          <div className="text-center py-12">
            <span className="text-6xl mb-4 block">🔍</span>
            <h3 className="text-[var(--bleu-nuit)] dark:text-[var(--ocre-doux)] mb-2">
              No meditations found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or search terms
            </p>
          </div>
        </NaturalCard>
      )}

      {/* Modal d'ajout */}
      <NaturalModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          resetForm();
        }}
        title="Add New Meditation"
        size="lg"
      >
        <div className="space-y-4">
          <NaturalInput
            label="Title"
            placeholder="Enter meditation title"
            value={tit}
            onChange={(e) => setTit(e.target.value)}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <NaturalInput
              type="number"
              label="Duration (minutes)"
              placeholder="15"
              min="1"
              value={dur}
              onChange={(e) => setDur(e.target.value)}
              required
            />
            <NaturalSelect
              label="Category"
              value={cat}
              onChange={(e) => setCat(e.target.value)}
              required
            >
              <option value="stress">stress</option>
              <option value="sommeil">sommeil</option>
              <option value="focus">focus</option>
              <option value="confiance">confiance</option>
            </NaturalSelect>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <NaturalSelect
              label="Language"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              required
            >
              <option value="french">french</option>
              <option value="english">english</option>
            </NaturalSelect>
            <NaturalSelect
              label="Instructor Type"
              value={instr}
              onChange={(e) => setInstr(e.target.value)}
              required
            >
              <option value="female">Female</option>
              <option value="male">Male</option>
            </NaturalSelect>
          </div>

          {/* Upload audio */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Audio File
              <span className="text-xs text-muted-foreground ml-2">
                (MP3, WAV, etc.)
              </span>
            </label>
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
              className="w-full p-2 border border-[var(--ocre-doux)] rounded-xl bg-transparent text-[var(--bleu-nuit)] dark:text-[var(--ocre-doux)]"
            />
            {uploading && (
              <div className="mt-1 text-sm text-[var(--terre-brique)]">
                Uploading...
              </div>
            )}
            {audioFile && (
              <div className="mt-1 text-sm text-green-600">
                Fichier sélectionné: {audioFile.name}
              </div>
            )}
          </div>

          <NaturalTextarea
            label="Description"
            placeholder="Enter meditation description..."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows={4}
          />

          <div className="flex gap-3 justify-end pt-4">
            <NaturalButton
              variant="ghost"
              onClick={() => {
                setIsAddModalOpen(false);
                resetForm();
              }}
            >
              Cancel
            </NaturalButton>
            <NaturalButton
              variant="primary"
              onClick={handleAddMeditation}
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Add Meditation"}
            </NaturalButton>
          </div>
        </div>
      </NaturalModal>

      {/* Modal d'édition */}
      <NaturalModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          resetForm();
        }}
        title="Edit Meditation"
        size="lg"
      >
        <div className="space-y-4">
          <NaturalInput
            label="Title"
            placeholder="Enter meditation title"
            value={formData.title || ""}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <NaturalInput
              type="number"
              label="Duration (minutes)"
              placeholder="15"
              min="1"
              value={formData.duration?.toString() || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  duration: parseInt(e.target.value) || 0,
                })
              }
              required
            />
            <NaturalSelect
              label="Category"
              value={formData.category || "Mindfulness"}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              required
            >
              <option value="Mindfulness">Mindfulness</option>
              <option value="Sleep">Sleep</option>
              <option value="Relaxation">Relaxation</option>
              <option value="Productivity">Productivity</option>
              <option value="Compassion">Compassion</option>
            </NaturalSelect>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <NaturalSelect
              label="Language"
              value={formData.language || "French"}
              onChange={(e) =>
                setFormData({ ...formData, language: e.target.value })
              }
              required
            >
              <option value="french">french</option>
              <option value="english">english</option>
            </NaturalSelect>
            <NaturalSelect
              label="Instructor Type"
              value={formData.instructorType || "Female"}
              onChange={(e) =>
                setFormData({ ...formData, instructorType: e.target.value })
              }
              required
            >
              <option value="Female">Female</option>
              <option value="Male">Male</option>
            </NaturalSelect>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Audio File
              <span className="text-xs text-muted-foreground ml-2">
                (Laissez vide pour garder le fichier actuel)
              </span>
            </label>
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
              className="w-full p-2 border border-[var(--ocre-doux)] rounded-xl bg-transparent text-[var(--bleu-nuit)] dark:text-[var(--ocre-doux)]"
            />
            {uploading && (
              <div className="mt-1 text-sm text-[var(--terre-brique)]">
                Uploading...
              </div>
            )}
            {audioFile && (
              <div className="mt-1 text-sm text-green-600">
                Nouveau fichier sélectionné: {audioFile.name}
              </div>
            )}
            {selectedMeditation?.audioUrl && !audioFile && (
              <div className="mt-1 text-sm text-blue-600">
                Fichier audio actuel présent
              </div>
            )}
          </div>

          <NaturalTextarea
            label="Description"
            placeholder="Enter meditation description..."
            value={formData.description || ""}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows={4}
          />

          <div className="flex gap-3 justify-end pt-4">
            <NaturalButton
              variant="ghost"
              onClick={() => setIsEditModalOpen(false)}
            >
              Cancel
            </NaturalButton>
            <NaturalButton
              variant="primary"
              onClick={handleEditMeditation}
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Save Changes"}
            </NaturalButton>
          </div>
        </div>
      </NaturalModal>

      {/* Modal de confirmation de suppression */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteMeditation}
        title="Delete Meditation"
        description={`Are you sure you want to delete "${selectedMeditation?.title}"? This action cannot be undone and will also delete the associated audio file.`}
      />
    </div>
  );
}
