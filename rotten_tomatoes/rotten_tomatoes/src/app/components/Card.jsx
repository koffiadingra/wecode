"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function Card(props) {
  const { donneesRecu } = props;
  console.log(donneesRecu);
  //test de l'api movie je j'ai crée
  const [movies, setMovies] = useState([]);
  let donnees = [];
  const [baseURL, setBaseURL] = useState(
    "https://image.tmdb.org/t/p/original/"
  );

  const { data: session } = useSession();
  // console.log("axel :", session);

  useEffect(() => {
    async function reccuperation() {
      const res = await fetch("http://localhost:3000/api/movie");
      const data = await res.json();
      donnees = await data.data;
      if (donneesRecu !== "") {
        setMovies(
          donnees.filter((item) =>
            item.title.toLowerCase().includes(donneesRecu.toLowerCase())
          )
        );
      } else {
        setMovies(donnees.reverse());
      }

      console.log("relance");
    }
    reccuperation();
  }, [donneesRecu]);

  const AjouterFav = async (id) => {
    // console.log(id);
    try {
      await axios.post("/api/favoris", {
        userId: session.user.id,
        movieId: id,
      });
      console.log("Favoris ok");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <div className="max-w-2xl sm:text-center md:mx-auto">
        <h2 className="text-gray-800 text-3xl mt-5 font-bold sm:text-4xl">
          Les films disponibles
        </h2>
      </div>
      <div className="mt-12">
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {movies.map((movie) => (
            <li
              key={movie._id}
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
                  <div className="absolute bottom-0 w-full h-[20%] backdrop-blur-sm">
                    <div className="flex items-center justify-center w-full h-full">
                      <Link href={`/pages/detail?req=${movie._id}`}>
                        <button
                          type="button"
                          className="text-white bg-red-500 hover:bg-red-800 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2"
                        >
                          Voir détails
                        </button>
                      </Link>
                      <div
                        onClick={() => AjouterFav(movie._id)}
                        className="rounded-full text-white border border-white p-1 hover:border-red-500 hover:text-red-500"
                      >
                        <svg
                          class="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.828a4 4 0 010-5.656z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
