"use client";
import { useState, useEffect } from "react";
import { X, MapPin } from "lucide-react";
import { TableActions } from "@/components/TableUsers";
import { PaginationIconsOnly } from "@/components/Pagination";

interface FormData {
  client: string;
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
  client?: string;
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
  const initialState: FormData = {
    client: "",
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
  };
  const [form, setForm] = useState<FormData>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
  }, [isOpen]);

  const handleChange = (field: keyof FormData, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const newErrors: FormErrors = {};
    if (!form.client.trim())
      newErrors.client = "Le nom du client est obligatoire.";
    if (!form.sigle.trim()) newErrors.sigle = "Le sigle est obligatoire.";

    if (!form.client.trim())
      newErrors.client = "Le nom du client est obligatoire.";
    if (!form.sigle.trim()) newErrors.sigle = "Le sigle est obligatoire.";

    if (form.email && !isValidEmail(form.email)) {
      newErrors.email = "Format d'email invalide.";
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/client/create`, {
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
            ncc: data.errors.ncc?.[0],
            rccm: data.errors.rccm?.[0],
            email: data.errors.email?.[0],
          });
        }
      }
      setForm(initialState);
    } catch (error) {
      console.error("Erreur lors de la création du client :", error);
      setErrors({ client: "Erreur réseau. Veuillez réessayer." });
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }

    setIsSubmitting(false);
    return true;
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
                value={form.client}
                onChange={(e) => handleChange("client", e.target.value)}
                className={`w-[400px] px-3.5 py-3 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 ${
                  errors.client ? "border-red-400 bg-red-50" : "border-gray-300"
                }`}
              />
              {errors.client && (
                <p className="text-xs text-red-500 mt-1">{errors.client}</p>
              )}
            </div>

            <div className="ml-32">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Sigle <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Sigle"
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

            <div className="flex gap-x-10">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  TVA (%)
                </label>
                <input
                  type="number"
                  min={18}
                  max={99}
                  value={form.tva}
                  onChange={(e) =>
                    handleChange("tva", parseFloat(e.target.value) || 18)
                  }
                  className={`px-2 py-3 w-[55px] text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 ${
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
                  max={365}
                  value={form.delai}
                  onChange={(e) =>
                    handleChange("delai", parseInt(e.target.value) || 0)
                  }
                  className={`px-2 py-3 w-[65px] text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 ml-10 ${
                    errors.delai
                      ? "border-red-400 bg-red-50"
                      : "border-gray-300"
                  }`}
                />
                {errors.delai && (
                  <p className="text-xs text-red-500 mt-1">{errors.delai}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Numéro
              </label>
              <input
                type="tel"
                placeholder="+XXX XXXXXXXXXX"
                value={form.numero}
                onChange={(e) => handleChange("numero", e.target.value)}
                className="w-full px-3.5 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Adresse
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Adresse physique"
                  value={form.adresse}
                  onChange={(e) => handleChange("adresse", e.target.value)}
                  className="px-3.5 py-3 pr-12 w-full text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
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
          </div>

          <div className="flex gap-4 justify-end mt-6 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => {
                setForm(initialState);
                onClose();
              }}
              className="bg-gray-100 text-gray-700 font-semibold px-6 py-2 rounded-lg hover:bg-gray-200 transition"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-slate-950 text-white font-semibold px-6 py-2 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
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
      <div className="flex-1 p-6">
        <div className="flex justify-end mb-5">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-slate-950 text-white font-semibold px-6 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            + Nouveau client
          </button>
        </div>

        <div className="p-3 bg-white rounded-2xl shadow-[0_2px_20px_-4px_rgba(0,0,0,0.04)] border border-teal-70 overflow-hidden">
          <TableActions />
          <PaginationIconsOnly />
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
