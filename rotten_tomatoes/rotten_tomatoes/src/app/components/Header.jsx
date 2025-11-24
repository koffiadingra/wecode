"use client";
import axios from "axios";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header({ onDataChange }) {
  const { data: session } = useSession();
  const [search, setSearch] = useState("");
  const [user, setUser] = useState("");
  const handleClear = () => setSearch("");
  const handleSubmit = (e) => {
    e.preventDefault();
    onDataChange(search);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/users/${session.user.id}`);

        setUser(response.data);
      } catch (error) {
        console.log("Erreur de chargement :", error);
      }
    };
    fetchUser();
  }, [session]);

  return (
    <header className="w-full bg-red-500 text-white p-6 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
      <div className="px-8">
        <Link href="/" className="flex flex-col items-center">
          <h1 className="text-2xl font-bold drop-shadow-lg">Rotten</h1>
          <h1 className="text-2xl font-bold drop-shadow-lg">Tomatoes</h1>
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex w-full md:w-1/3 bg-white rounded-full overflow-hidden h-10 shadow-lg focus-within:shadow-2xl focus-within:ring-2 focus-within:ring-red-400 transition-all duration-300"
      >
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher un film ou une série..."
          className="flex-1 px-4 text-gray-700 outline-none transition-all"
        />

        {search && (
          <button
            type="button"
            onClick={handleClear}
            className="px-2 text-gray-500 hover:text-gray-700 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 text-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}

        <button
          type="submit"
          className="bg-gray-900 px-4 text-white font-semibold hover:bg-gray-600 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.197 5.197a7.5 7.5 0 0010.604 10.604z"
            />
          </svg>
        </button>
      </form>

      <nav className="space-x-4">
        {user ? (
          <div className="flex gap-4 items-center">
            {user.role === "admin" && (
              <Link href="/pages/Admin/">
                <button className="bg-red-500 hover:bg-red-800   py-1 rounded text-white">
                  Dashboard
                </button>
              </Link>
            )}
            <Link href="/pages/Favoris">
              <button className="bg-red-500 hover:bg-red-800   py-1 rounded text-white">
                Favoris
              </button>
            </Link> 
            <div className="dropdown dropdown-bottom mr-10">
              <div tabIndex={0} role="button" className="btn m-1">
                {user.username}
              </div>
              <div className="">
                <ul
                  tabIndex="-1"
                  className="dropdown-content menu bg-secondary-100 rounded-box z-1 shadow-sm"
                >
                  <li>
                    <a href="/pages/Profile" className="text-black bg-white">
                      Profil
                    </a>
                  </li>
                  <li>
                    <a className="text-black bg-white">
                      <button
                        onClick={() => signOut()}
                        className="hover:bg-gray-100 cursor-pointer"
                      >
                        Déconnexion
                      </button>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-x-4">
            <Link href="/pages/login">
              <button>
                <p className="hover:underline transition shadow-2xl cursor-pointer">
                  Connexion
                </p>
              </button>
            </Link>
            <Link href="/pages/register">
              <button>
                <p className="hover:underline transition shadow-2xl cursor-pointer">
                  Inscription
                </p>
              </button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
