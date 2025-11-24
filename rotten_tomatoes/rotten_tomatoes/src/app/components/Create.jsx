"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !username.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirm_password.trim()
    ) {
      setError(
        "Tous les champs sont requis et ne peuvent pas contenir des espaces."
      );
      return;
    }
    if (password !== confirm_password) {
      setError("mot de passe incoorect");
      return;
    }
    try {
      const resUserExists = await axios.post("/api/userExists", {
        email: email,
      });
      const { user } = await resUserExists.data;
      if (user) {
        setError("Email exists déjà !");
        return;
      }

      const response = await axios.post("/api/register", {
        username: username.trim(),
        email: email.trim(),
        password: password.trim(),
      });
      if (response) {
        window.location.reload();
      }
      console.log("Registration successful:", response.data);
    } catch (error) {
      console.error(
        "Registration error:",
        error.response ? error.response.data : error.message
      );
    }
  };
  return (
    <div>
      <div className="w-full flex flex-col items-center justify-center px-6 py-10 animate-fadeInUp">
        <form
          className="md:w-96 w-80 flex flex-col items-center justify-center p-8 rounded-2xl "
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl mb-5 text-gray-900 font-bold">
            Ajouter un utilisateur
          </h2>

          <div className="flex items-center w-full bg-transparent border border-red-500/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all focus-within:ring-2 focus-within:ring-red-400">
            <svg
              width="16"
              height="16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 0a4 4 0 110 8 4 4 0 010-8zm0 9c-2.667 0-8 1.333-8 4v3h16v-3c0-2.667-5.333-4-8-4z"
                fill="#fb2c36"
              />
            </svg>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nom complet"
              className="bg-transparent text-gray-800 placeholder-gray-500/80 outline-none text-sm w-full h-full"
              required
            />
          </div>

          <div className="flex items-center mt-6 w-full bg-transparent border border-red-500/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all focus-within:ring-2 focus-within:ring-red-400">
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
              value={email}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
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
              value={confirm_password}
              onChange={(e) => setConfirm_password(e.target.value)}
              placeholder="Confirmer le mot de passe"
              className="bg-transparent text-gray-800 placeholder-gray-500/80 outline-none text-sm w-full h-full"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full h-11 rounded-full text-white bg-indigo-500 hover:bg-indigo-600 transition-all transform hover:scale-105 active:scale-95 shadow-md"
          >
            Ajouter
          </button>
        </form>
      </div>
    </div>
  );
}

return <CreateForm />;
