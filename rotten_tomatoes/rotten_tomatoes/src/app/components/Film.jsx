"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function Film() {
  const [movies, setMovies] = useState([]);

  const baseURL = `https://image.tmdb.org/t/p/original`;

  const API_KEY = "21d706cf589e186781f66007bde318cd";
  const BASE_URL = "https://api.themoviedb.org/3";
  const tmdbApi = axios.create({
    baseURL: BASE_URL,
    params: {
      api_key: API_KEY,
    },
  });

  useEffect(() => {
    async function test() {
      try {
        const response = await tmdbApi.get("/movie/popular");
        console.log(response.data.results);
        setMovies(response.data.results);
        return response;
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    }
    test();
  }, []);

  async function AddMovie(e) {
    const identifient = e.target.id;
    const film = movies.find((elem) => elem.id == identifient);
    const {
      title,
      overview,
      original_language,
      popularity,
      release_date,
      poster_path,
    } = film;
    /////////////////////
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: overview,
        langage: original_language,
        popularity: popularity,
        release_date: release_date,
        poster_path: poster_path,
      }),
    };
    const res = await fetch("http://localhost:3000/api/movie", options);

    if (res.status) {
      console.log("ajouter");
    }
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <div className="max-w-2xl sm:text-center md:mx-auto">
        <h2 className="text-gray-800 text-3xl mt-5 font-bold sm:text-4xl">
          Les films disponibles sur L'API
        </h2>
      </div>
      <div className="mt-12">
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {movies.map((movie) => (
            <li
              key={movie.id}
              className="bg-white border rounded-xl h-[500] w-auto"
            >
              <div
                style={{
                  backgroundImage: `url('${baseURL}${movie.poster_path}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                className="relative h-full w-auto overflow-hidden rounded-xl"
              >
                <p className="text-white bg-black font-bold text-center">
                  {movie.title}
                </p>
                <div className=" absolute h-[125%] w-full bg-transparent translate-y-0 hover:-translate-y-[20%] duration-300">
                  <div className="absolute bottom-0 w-full h-[50%] backdrop-blur-sm">
                    <p className="text-yellow-500 m-2 font-bold">
                      Description : {movie.overview.slice(0, 100)}...
                    </p>
                    <div className="flex items-center justify-center w-full h-full">
                      <button
                        type="button"
                        id={movie.id}
                        onClick={AddMovie}
                        className="text-white bg-red-500 hover:bg-red-800 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2"
                      >
                        Ajouter
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
          ;
        </ul>
      </div>
    </div>
  );
}
