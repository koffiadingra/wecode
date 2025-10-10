import React, { useState } from "react";

function MangaSearch() {
  const [query, setQuery] = useState("");
  const [mangas, setMangas] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchManga = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/manga?q=${encodeURIComponent(query)}&limit=10`
      );
      const data = await response.json();
      setMangas(data.data || []);
    } catch (err) {
      console.error("Erreur :", err);
      setMangas([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Recherche de Mangas</h1>
      <form onSubmit={searchManga} className="mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ex: Naruto, One Piece..."
          className="px-4 py-2 border rounded w-full max-w-md"
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Chercher
        </button>
      </form>

      {loading && <p>loading...</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mangas.map((manga) => (
          <div key={manga.mal_id} className="border rounded p-4 shadow">
            <img
              src={manga.images.jpg.image_url}
              alt={manga.title}
              className="w-full h-48 object-cover rounded mb-2"
            />
            <h3 className="font-bold">{manga.title}</h3>
            <p>Chapitres : {manga.chapters || "Inconnu"}</p>
            <p>Note : {manga.score || "N/A"}/10</p>
            <p>Auteur(s) : {manga.authors.map(a => a.name).join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MangaSearch;
