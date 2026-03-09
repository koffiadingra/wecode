"use client";
import Image from "next/image";
import LeftImage from "../../public/image.png";
// import { useState } from "react";
import xsel_image from "../../public/xsel_logo.png";
import Link from "next/link";

export default function Login() {
  //  const [email, setEmail] = useState("");

  return (
    <div className="flex min-h-screen bg-zinc-100 font-sans dark:bg-black sticky top-0 ">
      {/* bloc de gauche */}
      <div className="w-1/2 flex flex-col items-center justify-center h-screen gap-5">
        <div>
          <Image
            src={xsel_image}
            alt="Picture"
            className="w-full h-full border rounded-lg object-cover"
          />
        </div>

        <div>
          <div className="text-center mb-10">
            <h1 className="text-2xl font-bold">Mot de passe oublié</h1>
            <p className="text-gray-500">
              Veuillez entrer une adresse mail.
            </p>
          </div>
          <form
            action=""
            className="flex flex-col items-center justify-center p-4 gap-4"
          >
            <div className="flex flex-col space-y-2">
              <label htmlFor="email">Adresse mail</label>
              <input
                type="email"
                id="email"
                placeholder="Adresse mail"
                className="border rounded-lg w-[350px] p-2 py-2.5 ps-3.5 pe-10"
                required
              />
            </div>
            <div className="flex gap-10 items-center justify-between mb-10">
              <div>
                Vous avez déjà un compte ?
                <Link
                  href="/login"
                  className="text-sm text-black font-bold ml-3 "
                >
                  Se connecter
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="bg-black font-bold text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors w-[350px]"
              >
                Envoyer
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* bloc de droite */}
      <div className="w-1/2 p-3 fixed right-0 top-0 h-screen">
        <Image
          src={LeftImage}
          alt="Picture of the author"
          className="w-full h-full max-w-full border rounded-lg object-cover"
        />
      </div>
    </div>
  );
}
