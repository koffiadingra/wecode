"use client";
import { useState, useEffect } from "react";
import { X, MapPin } from "lucide-react";
import Sidebar from "@/components/Sidebar";

interface FormData {
  name: string;
  sigle: string;
  code: string;
  ncc: string;
  rccm: string;
  tva: number;
  delai: number;
  adresse: string;
  localisation: string;
  numero: string;
  email: string;
}

interface FormErrors {
  name?: string;
  sigle?: string;
  code?: string;
  ncc?: string;
  rccm?: string;
  tva?: string;
  delai?: string;
  email?: string;
}

const generateClientCode = (lastIncrement: number): string => {
  const year = new Date().getFullYear();
  const increment = String(lastIncrement).padStart(4, "0");
  return `CL-${year}-${increment}`;
};

const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isValidCodeFormat = (code: string): boolean => {
  return /^CL-\d{4}-\d{4}$/.test(code);
};

interface CreateClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function CreateClientModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateClientModalProps) {
  const [form, setForm] = useState<FormData>({
    name: "",
    sigle: "",
    code: generateClientCode(1),
    ncc: "",
    rccm: "",
    tva: 18,
    delai: 0,
    adresse: "",
    localisation: "",
    numero: "",
    email: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [codeManuallyEdited, setCodeManuallyEdited] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchNextIncrement();
      setErrors({});
      setCodeManuallyEdited(false);
    }
  }, [isOpen]);

  const fetchNextIncrement = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/clients/next-code", {
        credentials: "include",
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        const data = await res.json();
        const increment = data.increment ?? data.next_increment ?? 1;
        setForm((prev) => ({
          ...prev,
          code: generateClientCode(increment),
        }));
      }
    } catch {}
  };

  const handleChange = (field: keyof FormData, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleCodeChange = (value: string) => {
    setCodeManuallyEdited(true);
    handleChange("code", value);
  };

  const validate = async (): Promise<boolean> => {
    const newErrors: FormErrors = {};

    if (!form.name.trim()) newErrors.name = "Le nom du client est obligatoire.";
    if (!form.sigle.trim()) newErrors.sigle = "Le sigle est obligatoire.";
    if (!form.code.trim()) {
      newErrors.code = "Le code est obligatoire.";
    } else if (!isValidCodeFormat(form.code)) {
      newErrors.code = "Format invalide. Attendu : CL-YYYY-NNNN";
    }

    if (form.email && !isValidEmail(form.email)) {
      newErrors.email = "Format d'email invalide.";
    }

    if (form.tva < 0) newErrors.tva = "La TVA doit être positive.";
    if (form.delai < 0) newErrors.delai = "Le délai doit être positif.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }

    try {
      const res = await fetch(
        "http://localhost:8000/api/clients/check-unique",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            code: form.code,
            ncc: form.ncc || null,
            rccm: form.rccm || null,
          }),
        },
      );

      if (res.ok) {
        const data = await res.json();
        if (data.code_exists) newErrors.code = "Ce code client existe déjà.";
        if (data.ncc_exists) newErrors.ncc = "Ce NCC existe déjà.";
        if (data.rccm_exists) newErrors.rccm = "Ce RCCM existe déjà.";
      }
    } catch {}

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const isValid = await validate();
    if (!isValid) {
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/clients", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        onSuccess?.();
        onClose();
      } else {
        const data = await res.json();
        if (data.errors) {
          setErrors({
            code: data.errors.code?.[0],
            ncc: data.errors.ncc?.[0],
            rccm: data.errors.rccm?.[0],
            email: data.errors.email?.[0],
          });
        }
      }
    } catch (error) {
      console.error("Erreur lors de la création du client :", error);
    }

    setIsSubmitting(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative z-10 bg-white rounded-xl shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
          <h2 className="text-lg font-semibold text-cyan-900">
            Nouveau client
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 transition"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Client <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="NOM DU CLIENT"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className={`w-full px-3.5 py-3 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 ${
                  errors.name ? "border-red-400 bg-red-50" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <p className="text-xs text-red-500 mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Sigle <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Sigle client"
                value={form.sigle}
                onChange={(e) => handleChange("sigle", e.target.value)}
                className={`w-full px-3.5 py-3 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 ${
                  errors.sigle ? "border-red-400 bg-red-50" : "border-gray-300"
                }`}
              />
              {errors.sigle && (
                <p className="text-xs text-red-500 mt-1">{errors.sigle}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Code <span className="text-red-500">*</span>
                <span className="ml-1 text-xs text-gray-400 font-normal">
                  (CL-YYYY-NNNN)
                </span>
              </label>
              <input
                type="text"
                value={form.code}
                onChange={(e) => handleCodeChange(e.target.value)}
                className={`w-full px-3.5 py-3 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 font-mono ${
                  errors.code ? "border-red-400 bg-red-50" : "border-gray-300"
                }`}
              />
              {errors.code && (
                <p className="text-xs text-red-500 mt-1">{errors.code}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                NCC
              </label>
              <input
                type="text"
                placeholder="NCC"
                value={form.ncc}
                onChange={(e) => handleChange("ncc", e.target.value)}
                className={`w-full px-3.5 py-3 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 ${
                  errors.ncc ? "border-red-400 bg-red-50" : "border-gray-300"
                }`}
              />
              {errors.ncc && (
                <p className="text-xs text-red-500 mt-1">{errors.ncc}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                RCCM
              </label>
              <input
                type="text"
                placeholder="RCCM"
                value={form.rccm}
                onChange={(e) => handleChange("rccm", e.target.value)}
                className={`w-full px-3.5 py-3 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 ${
                  errors.rccm ? "border-red-400 bg-red-50" : "border-gray-300"
                }`}
              />
              {errors.rccm && (
                <p className="text-xs text-red-500 mt-1">{errors.rccm}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                TVA (%)
              </label>
              <input
                type="number"
                min={0}
                value={form.tva}
                onChange={(e) =>
                  handleChange("tva", parseFloat(e.target.value) || 0)
                }
                className={`w-full px-3.5 py-3 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 ${
                  errors.tva ? "border-red-400 bg-red-50" : "border-gray-300"
                }`}
              />
              {errors.tva && (
                <p className="text-xs text-red-500 mt-1">{errors.tva}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Délai de paiement (jours)
              </label>
              <input
                type="number"
                min={0}
                value={form.delai}
                onChange={(e) =>
                  handleChange("delai", parseInt(e.target.value) || 0)
                }
                className={`w-full px-3.5 py-3 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 ${
                  errors.delai ? "border-red-400 bg-red-50" : "border-gray-300"
                }`}
              />
              {errors.delai && (
                <p className="text-xs text-red-500 mt-1">{errors.delai}</p>
              )}
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Adresse
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Adresse physique"
                  value={form.adresse}
                  onChange={(e) => handleChange("adresse", e.target.value)}
                  className="w-full px-3.5 py-3 pr-12 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
                <button
                  type="button"
                  title="Ouvrir le sélecteur d'adresse"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-700 transition"
                  onClick={() => {}}
                >
                  <MapPin size={18} />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Localisation
              </label>
              <input
                type="text"
                placeholder="Localisation géographique"
                value={form.localisation}
                onChange={(e) => handleChange("localisation", e.target.value)}
                className="w-full px-3.5 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Numéro
              </label>
              <input
                type="tel"
                placeholder="+XXX XXXXXXXXX"
                value={form.numero}
                onChange={(e) => handleChange("numero", e.target.value)}
                className="w-full px-3.5 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Adresse mail
              </label>
              <input
                type="email"
                placeholder="exemple@domaine.com"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className={`w-full px-3.5 py-3 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 ${
                  errors.email ? "border-red-400 bg-red-50" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="flex gap-4 justify-end mt-6 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-100 text-gray-700 font-semibold px-6 py-2 rounded-lg hover:bg-gray-200 transition"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-black text-white font-semibold px-6 py-2 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
            >
              {isSubmitting ? "Enregistrement..." : "Enregistrer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ClientPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen">

      <Sidebar />

      <div className="flex-1 p-6">
        <div className="flex justify-end">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-teal-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            + Nouveau client
          </button>
        </div>

        <CreateClientModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSuccess={() => {
            console.log("Client créé avec succès !");
          }}
        />
      </div>

    </div>
  );
}
