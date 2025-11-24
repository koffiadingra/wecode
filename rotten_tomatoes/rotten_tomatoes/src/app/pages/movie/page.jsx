"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";

function MovieSearch() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const apiKey = "21d706cf589e186781f66007bde318cd";

  const searchMovies = async () => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;
    try {
      const response = await axios.get(url);
      console.log(response.data.results);

      setMovies(response.data.results);
    } catch (error) {
      console.error("Erreur lors de la recherche des films :", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Rechercher un film..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={searchMovies}>Rechercher</button>
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-item">
            <h2>{movie.title}</h2>
            <p>{movie.release_date}</p>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieSearch;
