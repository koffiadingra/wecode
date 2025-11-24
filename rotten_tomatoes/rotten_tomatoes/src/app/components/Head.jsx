"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function Head({ onDataChange }) {
  const [search, setSearch] = useState("");
  const { data: session } = useSession();

  return (
    <header className="w-full bg-red-500 text-white p-6 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
      <div className="px-8">
        <Link href="/" className="flex flex-col items-center">
          <h1 className="text-2xl font-bold drop-shadow-lg">Rotten</h1>
          <h1 className="text-2xl font-bold drop-shadow-lg">Tomatoes</h1>
        </Link>
      </div>

      <div>
        <Link href="/" className="hover:underline transition shadow-2xl mr-3">
          User Home
        </Link>
        <Link
          href="/pages/Admin"
          className="hover:underline transition shadow-2xl mr-3"
        >
          Add Movie
        </Link>
        <Link
          href="/pages/Admin/user"
          className="hover:underline transition shadow-2xl mr-3"
        >
          Utilisateur
        </Link>
        <Link
          href="/pages/Admin/dispfilm"
          className="hover:underline transition shadow-2xl"
        >
          Films
        </Link>
      </div>

      <nav className="space-x-4">
        {session ? (
          <div className="flex gap-4 items-center">
            <span>{session.user.name}</span>
            <button
              onClick={() => signOut()}
              className="bg-red-500 hover:bg-red-400  px-3 py-1 rounded text-white"
            >
              Déconnexion
            </button>
          </div>
        ) : (
          <div className="space-x-4">
            <Link href="/pages/login">
              <button>
                <p className="hover:underline transition shadow-2xl">
                  Connexion
                </p>
              </button>
            </Link>
            <Link href="/pages/register">
              <button>
                <p className="hover:underline transition">Inscription</p>
              </button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
