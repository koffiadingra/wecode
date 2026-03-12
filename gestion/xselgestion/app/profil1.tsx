"use client";

import { useState } from "react";

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[10px] font-semibold tracking-widest uppercase text-neutral-400">
      {children}
    </span>
  );
}

function InfoRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-neutral-100 last:border-0">
      <Label>{label}</Label>
      <span className="text-sm text-neutral-800 font-medium">{value ?? "—"}</span>
    </div>
  );
}

function InputField({
  label,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label>{label}</Label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-neutral-200 bg-neutral-50 rounded-sm px-3 py-2.5 text-sm text-neutral-900 outline-none focus:border-black focus:ring-2 focus:ring-black/5 transition-all"
      />
    </div>
  );
}

function Alert({ type, message }: { type: "error" | "success"; message: string }) {
  return (
    <div className={`text-sm px-3 py-2.5 rounded-sm border mb-4 ${
      type === "error"
        ? "text-red-700 bg-red-50 border-red-200"
        : "text-green-700 bg-green-50 border-green-200"
    }`}>
      {message}
    </div>
  );
}

function ProfileSection() {
  const [form, setForm] = useState({
    firstname: "Jean",
    lastname: "Dupont",
    phone: "+2250778909537",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState({ ...form });

  const handleSave = () => {
    setSaved({ ...form });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setForm({ ...saved });
    setIsEditing(false);
  };

  return (
    <section className="bg-white border border-neutral-200 rounded-sm p-8">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 bg-black flex items-center justify-center rounded-sm flex-shrink-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-black tracking-tight">
          Informations personnelles
        </h2>
      </div>

      <div className="h-px bg-neutral-100 mb-6" />

      {isEditing ? (
        <div className="flex flex-col gap-4">
          <InputField label="Prénom" value={form.firstname} onChange={(v) => setForm({ ...form, firstname: v })} />
          <InputField label="Nom" value={form.lastname} onChange={(v) => setForm({ ...form, lastname: v })} />
          <InputField label="Téléphone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleSave}
              className="bg-black text-white text-xs font-semibold tracking-widest uppercase px-5 py-2.5 rounded-sm hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Enregistrer
            </button>
            <button
              onClick={handleCancel}
              className="text-neutral-500 text-sm hover:text-black transition-colors cursor-pointer"
            >
              Annuler
            </button>
          </div>
        </div>
      ) : (
        <div>
          <InfoRow label="Prénom" value={saved.firstname} />
          <InfoRow label="Nom" value={saved.lastname} />
          <InfoRow label="Email" value="jean.dupont@example.com" />
          <InfoRow label="Téléphone" value={saved.phone} />
          <InfoRow label="Rôle" value="Administrateur" />

          <button
            onClick={() => setIsEditing(true)}
            className="mt-5 border border-black text-black text-xs font-semibold tracking-widest uppercase px-5 py-2.5 rounded-sm hover:bg-black hover:text-white transition-all cursor-pointer"
          >
            Modifier
          </button>
        </div>
      )}
    </section>
  );
}

function PasswordSection() {
  const [form, setForm] = useState({
    current_password: "",
    password: "",
    password_confirmation: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSave = () => {
    setError(""); setSuccess("");
    if (form.password !== form.password_confirmation) {
      setError("Les mots de passe ne correspondent pas."); return;
    }
    if (form.password.length < 8) {
      setError("Minimum 8 caractères requis."); return;
    }
    setSuccess("Mot de passe mis à jour.");
    setForm({ current_password: "", password: "", password_confirmation: "" });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setForm({ current_password: "", password: "", password_confirmation: "" });
    setIsEditing(false);
    setError("");
  };

  return (
    <section className="bg-white border border-neutral-200 rounded-sm p-8">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 bg-black flex items-center justify-center rounded-sm flex-shrink-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-black tracking-tight">
          Sécurité
        </h2>
      </div>

      <div className="h-px bg-neutral-100 mb-6" />

      {error && <Alert type="error" message={error} />}
      {success && <Alert type="success" message={success} />}

      {isEditing ? (
        <div className="flex flex-col gap-4">
          <InputField label="Mot de passe actuel" type="password" value={form.current_password} onChange={(v) => setForm({ ...form, current_password: v })} />
          <InputField label="Nouveau mot de passe" type="password" value={form.password} onChange={(v) => setForm({ ...form, password: v })} />
          <InputField label="Confirmer le mot de passe" type="password" value={form.password_confirmation} onChange={(v) => setForm({ ...form, password_confirmation: v })} />

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleSave}
              className="bg-black text-white text-xs font-semibold tracking-widest uppercase px-5 py-2.5 rounded-sm hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Mettre à jour
            </button>
            <button
              onClick={handleCancel}
              className="text-neutral-500 text-sm hover:text-black transition-colors cursor-pointer"
            >
              Annuler
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex gap-3 items-start bg-neutral-50 border border-neutral-100 rounded-sm p-3 mb-6">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" className="flex-shrink-0 mt-0.5">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="16" x2="12" y2="12"/>
              <line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Ton mot de passe est masqué pour des raisons de sécurité. Clique sur le bouton ci-dessous pour le modifier.
            </p>
          </div>

          <div className="flex items-center gap-1.5 mb-6">
            {Array.from({ length: 10 }).map((_, i) => (
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
    </section>
  );
}

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header noir */}
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

      {/* Grille */}
      <div className="max-w-5xl mx-auto px-10 grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
        <ProfileSection />
        <PasswordSection />
      </div>
    </div>
  );
}
