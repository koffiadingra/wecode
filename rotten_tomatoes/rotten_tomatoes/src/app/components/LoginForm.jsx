"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (response.error) {
        setError("Email ou mot de passe incorrect");
      } else {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden bg-white">
      <div className="hidden md:flex w-1/2 animate-slideInLeft">
        <img
          className="h-full w-full object-cover"
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/leftSideImage.png"
          alt="leftSideImage"
        />
      </div>

      <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-6 py-10 animate-fadeInUp">
        <form
          onSubmit={handleSubmit}
          className="md:w-96 w-80 flex flex-col items-center justify-center bg-white p-8 rounded-2xl shadow-lg"
        >
          <h2 className="text-4xl text-gray-900 font-bold">Se connecter</h2>
          <p className="text-sm text-gray-500 mt-3 font-medium mb-8 text-center">
            Bon retour ! Entrez vos informations pour continuer
          </p>

          {error && (
            <div className="bg-red-500 text-sm text-white w-fit py-1 px-3 mb-2 rounded-md">
              {error}
            </div>
          )}

          <div className="flex items-center w-full bg-transparent border border-red-500/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all focus-within:ring-2 focus-within:ring-red-400">
            <svg
              width="16"
              height="11"
              viewBox="0 0 16 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
                fill="#fb2c36"
              />
            </svg>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="bg-transparent text-gray-800 placeholder-gray-500/80 outline-none text-sm w-full h-full"
              required
            />
          </div>

          <div className="flex items-center mt-6 w-full bg-transparent border border-red-500/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all focus-within:ring-2 focus-within:ring-red-400">
            <svg
              width="13"
              height="17"
              viewBox="0 0 13 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
                fill="#fb2c36"
              />
            </svg>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
              className="bg-transparent text-gray-800 placeholder-gray-500/80 outline-none text-sm w-full h-full"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-8 w-full h-11 rounded-full text-white bg-indigo-500 hover:bg-indigo-600 transition-all transform hover:scale-105 active:scale-95 shadow-md"
          >
            Soumettre
          </button>

          <p className="text-gray-500 text-sm mt-4">
            Vous n'avez pas de compte ?{" "}
            <Link
              className="text-red-600 hover:underline"
              href="/pages/register"
            >
              Inscrivez-vous
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

return <LoginForm />;
