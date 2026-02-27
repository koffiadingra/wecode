"use client";
// import Link from "next/link";
import Sidebar from "@/components/Sidebar";

export default function Create_client() {
  return (
    <div className="flex flex-col min-h-screen">
      <div>
        <Sidebar />
      </div>
      {/* <div className=" flex items-center justify-center w-full h-screen relative bg-transparent bg-zinc-100">
        <div className="flex flex-col items-center justify-center h-screen">
          <h2 className="text-cyan-900 text-center flex justify-center mb-4">
            nouveau client
          </h2>
          <form
            action=""
            className="grid grid-cols-3 gap-2 w-[1000px] gap-6 rounded-lg border-gray-300 text-teal-500 inset-0 z-50 bg-white"
          >
            <div>
              <label htmlFor="nom">client</label>
              <input
                type="name"
                name="name"
                id="name"
                className="w-full px-3.5 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-300"
              />
            </div>
            <div>
              <label htmlFor="sigle">Sigle</label>
              <input
                type="sigle"
                name="sigle"
                id="sigle"
                className="w-full px-3.5 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-300"
              />
            </div>
            <div>
              <label htmlFor="Code"> Code</label>
              <input
                type="Code"
                name="Code"
                id="Code"
                className="w-full px-3.5 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-300"
              />
            </div>
            <div>
              <label htmlFor="NCC">NCC</label>
              <input
                type="NCC"
                name="NCC"
                id="NCC"
                className="w-full px-3.5 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-300"
              />
            </div>
            <div>
              <label htmlFor="RCCM">RCCM</label>
              <input
                type="RCCM"
                name="RCCM"
                id="RCCM"
                className="w-full px-3.5 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-300"
              />
            </div>
            <div>
              <label htmlFor="TVA (%)">TVA (%)</label>
              <input
                type="TVA (%)"
                name="TVA (%)"
                id="TVA (%)"
                className="w-full px-3.5 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-300"
              />
            </div>
            <div>
              <label htmlFor="Délai de paiement (jours)">
                Délai de paiement (jours)
              </label>
              <input
                type="Délai de paiement (jours)"
                name="Délai de paiement (jours)"
                id="Délai de paiement (jours)"
                className="w-full px-3.5 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-300"
              />
            </div>
            <div>
              <label htmlFor="Adresse">Adresse</label>
              <input
                type="Adresse"
                name="Adresse"
                id="Adresse"
                className="w-full px-3.5 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-300"
              />
            </div>
            <div>
              <label htmlFor=" Localisation"> Localisation</label>
              <input
                type=" Localisation"
                name=" Localisation"
                id=" Localisation"
                className="w-full px-3.5 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-300"
              />
            </div>
            <div>
              <label htmlFor="Numéro"> Numéro</label>
              <input
                type=" Numéro"
                name=" Numéro"
                id=" Numéro"
                className="w-full px-3.5 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-300"
              />
            </div>
            <div>
              <label htmlFor="Adresse mail">Adresse mail</label>
              <input
                type="Adresse mail"
                name="Adresse mail"
                id="Adresse mail"
                className="w-full px-3.5 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-300"
              />
            </div>
            <div className="flex gap-10 items-center justify-between mb-10">
              <div>
                <button
                  type="submit"
                  className="bg-black font-bold text-white px-4 py-2 rounded-lg"
                >
                  enrergistrer
                </button>
                <div className="mt-5">
                  <Link
                    href="/login"
                    className="bg-red-500 border rounded-lg font-bold text-white px-4 py-2 rounded-lg "
                  >
                    fermer
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div> */}
    </div>
  );
}
