"use client";

import { useState, useEffect } from "react";

import api from "@/lib/axios";


type User = {
  firstname: string; 
  lastname: string; 
  email: string; 
  phone: string; 
  role: string; 
};


export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="bg-black px-10 py-10 mb-10 relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-500 mb-2">
            Compte
          </p>
          <h1 className="text-4xl font-bold text-white tracking-tight">
            Mon Profil
          </h1>
        </div>
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full border border-white/5 pointer-events-none" />
        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full border border-white/5 pointer-events-none" />
      </div>

      <div className="max-w-5xl mx-auto px-6 pb-20 grid grid-cols-1 md:grid-cols-2 gap-6">
        <SectionProfil />
        <SectionMotDePasse />
      </div>
    </div>
  );
}


function SectionProfil() {

  const [user, setUser] = useState<User | null>(null);

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    phone: "",
  });

  const [isLoading, setIsLoading] = useState(true);

  const [isEditing, setIsEditing] = useState(false);

  const [isSaving, setIsSaving] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");


  useEffect(() => {
    const chargerProfil = async () => {
      try {
        const reponse = await api.get("/api/auth/user");

        const data: User = reponse.data?.data ?? reponse.data;

        setUser(data);

        setForm({
          firstname: data.firstname ?? "",
          lastname: data.lastname ?? "",
          phone: data.phone ?? "",
        });
      } catch {
        setError("Impossible de charger le profil.");
      } finally {
        setIsLoading(false);
      }
    };

    chargerProfil();
  }, []);

  const handleEnregistrer = async () => {
    setIsSaving(true);
    setError("");
    setSuccess("");

    try {
      await api.put("/api/auth/user", form);

      setUser((prev) => (prev ? { ...prev, ...form } : prev));

      setSuccess("Profil mis à jour avec succès !");
      setIsEditing(false);
    } catch {
      setError("Erreur lors de la mise à jour.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAnnuler = () => {
    if (user) {
      setForm({
        firstname: user.firstname,
        lastname: user.lastname,
        phone: user.phone,
      });
    }
    setIsEditing(false);
    setError("");
  };

  return (
    <section className="bg-white border border-neutral-200 rounded-sm p-8">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 bg-black flex items-center justify-center rounded-sm flex-shrink-0">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-black tracking-tight">
          Informations personnelles
        </h2>
      </div>

      <div className="h-px bg-neutral-100 mb-6" />

      {error && (
        <div className="text-sm px-3 py-2.5 rounded-sm border mb-4 text-red-700 bg-red-50 border-red-200">
          {error}
        </div>
      )}
      {success && (
        <div className="text-sm px-3 py-2.5 rounded-sm border mb-4 text-green-700 bg-green-50 border-green-200">
          {success}
        </div>
      )}

      {isLoading && (
        <div className="flex flex-col gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex flex-col gap-1.5">
              <div className="h-3 w-20 bg-neutral-200 rounded-sm animate-pulse" />
              <div className="h-10 w-full bg-neutral-100 rounded-sm animate-pulse" />
            </div>
          ))}
          <div className="h-9 w-28 bg-neutral-200 rounded-sm animate-pulse mt-2" />
        </div>
      )}

      {!isLoading && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-semibold tracking-widest uppercase text-neutral-400">
              Prénom(s)
            </span>
            <input
              type="text"
              value={form.firstname}
              onChange={(e) => setForm({ ...form, firstname: e.target.value })}
              disabled={!isEditing}
              className={`w-full border rounded-sm px-3 py-2.5 text-sm outline-none transition-all
                ${
                  isEditing
                    ? "border-neutral-200 bg-neutral-50 text-neutral-900 focus:border-black focus:ring-2 focus:ring-black/5"
                    : "border-neutral-100 bg-neutral-50 text-neutral-600 cursor-default"
                }`}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-semibold tracking-widest uppercase text-neutral-400">
              Nom
            </span>
            <input
              type="text"
              value={form.lastname}
              onChange={(e) => setForm({ ...form, lastname: e.target.value })}
              disabled={!isEditing}
              className={`w-full border rounded-sm px-3 py-2.5 text-sm outline-none transition-all
                ${
                  isEditing
                    ? "border-neutral-200 bg-neutral-50 text-neutral-900 focus:border-black focus:ring-2 focus:ring-black/5"
                    : "border-neutral-100 bg-neutral-50 text-neutral-600 cursor-default"
                }`}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-semibold tracking-widest uppercase text-neutral-400">
              Téléphone
            </span>
            <input
              type="text"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              disabled={!isEditing}
              className={`w-full border rounded-sm px-3 py-2.5 text-sm outline-none transition-all
                ${
                  isEditing
                    ? "border-neutral-200 bg-neutral-50 text-neutral-900 focus:border-black focus:ring-2 focus:ring-black/5"
                    : "border-neutral-100 bg-neutral-50 text-neutral-600 cursor-default"
                }`}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-semibold tracking-widest uppercase text-neutral-400">
              Email
            </span>
            <div className="border border-neutral-100 bg-neutral-100 rounded-sm px-3 py-2.5">
              <span className="text-sm text-neutral-500">{user?.email}</span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-semibold tracking-widest uppercase text-neutral-400">
              Rôle
            </span>
            <div className="border border-neutral-100 bg-neutral-100 rounded-sm px-3 py-2.5">
              <span className="text-sm text-neutral-500">{user?.role}</span>
            </div>
          </div>

          {isEditing ? (
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleEnregistrer}
                disabled={isSaving}
                className="bg-black text-white text-xs font-semibold tracking-widest uppercase px-5 py-2.5 rounded-sm hover:bg-neutral-800 transition-colors disabled:opacity-50 cursor-pointer"
              >
                {isSaving ? "Enregistrement…" : "Enregistrer"}
              </button>
              <button
                onClick={handleAnnuler}
                className="text-neutral-500 text-sm hover:text-black transition-colors cursor-pointer"
              >
                Annuler
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="mt-2 border border-black text-black text-xs font-semibold tracking-widest uppercase px-5 py-2.5 rounded-sm hover:bg-black hover:text-white transition-all cursor-pointer w-fit"
            >
              Modifier
            </button>
          )}
        </div>
      )}
    </section>
  );
}


function SectionMotDePasse() {

  const [form, setForm] = useState({
    current_password: "", 
    password: "", 
    password_confirmation: "", 
  });

  const [isEditing, setIsEditing] = useState(false);

  const [isSaving, setIsSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleEnregistrer = async () => {
    setError("");
    setSuccess("");

    if (form.password !== form.password_confirmation) {
      setError("Les mots de passe ne correspondent pas.");
      return; 
    }
    if (form.password.length < 8) {
      setError("Le nouveau mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    setIsSaving(true);

    try {
      await api.post("/api/auth/change-password", form);

      setSuccess("Mot de passe mis à jour avec succès !");

      setForm({
        current_password: "",
        password: "",
        password_confirmation: "",
      });
      setIsEditing(false);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ??
          "Erreur lors du changement de mot de passe.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleAnnuler = () => {
    setForm({ current_password: "", password: "", password_confirmation: "" });
    setIsEditing(false);
    setError("");
  };

  return (
    <section className="bg-white border border-neutral-200 rounded-sm p-8">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 bg-black flex items-center justify-center rounded-sm flex-shrink-0">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-black tracking-tight">
          Sécurité
        </h2>
      </div>

      <div className="h-px bg-neutral-100 mb-6" />

      {error && (
        <div className="text-sm px-3 py-2.5 rounded-sm border mb-4 text-red-700 bg-red-50 border-red-200">
          {error}
        </div>
      )}
      {success && (
        <div className="text-sm px-3 py-2.5 rounded-sm border mb-4 text-green-700 bg-green-50 border-green-200">
          {success}
        </div>
      )}

      {!isEditing && (
        <div>
          <div className="flex gap-3 items-start bg-neutral-50 border border-neutral-100 rounded-sm p-3 mb-6">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#999"
              strokeWidth="2"
              className="flex-shrink-0 mt-0.5"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Ton mot de passe est masqué pour des raisons de sécurité. Clique
              sur le bouton ci-dessous pour le modifier.
            </p>
          </div>

          <div className="flex items-center gap-1.5 mb-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-neutral-200" />
            ))}
          </div>

          <button
            onClick={() => setIsEditing(true)}
            className="border border-black text-black text-xs font-semibold tracking-widest uppercase px-5 py-2.5 rounded-sm hover:bg-black hover:text-white transition-all cursor-pointer"
          >
            Changer le mot de passe
          </button>
        </div>
      )}

      {isEditing && (
        <div className="flex flex-col gap-4">
          {/* Champ mot de passe actuel */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-semibold tracking-widest uppercase text-neutral-400">
              Mot de passe actuel
            </span>
            <input
              type="password"
              value={form.current_password}
              onChange={(e) =>
                setForm({ ...form, current_password: e.target.value })
              }
              className="w-full border border-neutral-200 bg-neutral-50 rounded-sm px-3 py-2.5 text-sm text-neutral-900 outline-none focus:border-black focus:ring-2 focus:ring-black/5 transition-all"
            />
          </div>

          {/* Champ nouveau mot de passe */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-semibold tracking-widest uppercase text-neutral-400">
              Nouveau mot de passe
            </span>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full border border-neutral-200 bg-neutral-50 rounded-sm px-3 py-2.5 text-sm text-neutral-900 outline-none focus:border-black focus:ring-2 focus:ring-black/5 transition-all"
            />
          </div>

          {/* Champ confirmation */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-semibold tracking-widest uppercase text-neutral-400">
              Confirmer le nouveau mot de passe
            </span>
            <input
              type="password"
              value={form.password_confirmation}
              onChange={(e) =>
                setForm({ ...form, password_confirmation: e.target.value })
              }
              className="w-full border border-neutral-200 bg-neutral-50 rounded-sm px-3 py-2.5 text-sm text-neutral-900 outline-none focus:border-black focus:ring-2 focus:ring-black/5 transition-all"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleEnregistrer}
              disabled={isSaving}
              className="bg-black text-white text-xs font-semibold tracking-widest uppercase px-5 py-2.5 rounded-sm hover:bg-neutral-800 transition-colors disabled:opacity-50 cursor-pointer"
            >
              {isSaving ? "Mise à jour…" : "Mettre à jour"}
            </button>
            <button
              onClick={handleAnnuler}
              className="text-neutral-500 text-sm hover:text-black transition-colors cursor-pointer"
            >
              Annuler
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
