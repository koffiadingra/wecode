"use client";
import { useEffect, useState } from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";


export default function Favoris() {
  const router = useRouter();
  const { data: session } = useSession();
  const [movies, setMovies] = useState([]);
  const [favoris, setFavoris] = useState([]);
  const [identifiantDel, setIdentifiantDel] = useState("");
  useEffect(() => {
    const fetchFavoris = async () => {
      try {
        console.log(session.user.id);
        const res = await axios.get(`/api/favoris/${session.user.id}`);
        const favoris = (await res.data.data) ;

        setFavoris(favoris);
        console.log(favoris);


        const ListFilms = [];
        for (const fav of favoris) {
          try {
            const response = await axios.get(`/api/movie/${fav.movieId}`);
            ListFilms.push(response.data.data);
          } catch (error) {
            console.error(error);
          }
        }
        setMovies(ListFilms);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFavoris();
  }, [session, identifiantDel]);

  const DeleteFav = async (userId, movieId) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    console.log("user:" + userId, "movie:" + movieId);
    const data = JSON.stringify({
      userId: userId,
      movieId: movieId,
    });
    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: data,
    };
    const response = await fetch(
      "http://localhost:3000/api/favoris",
      requestOptions
    );
    setIdentifiantDel(movieId);
    const recu = await response.json();

    console.log(recu);
  };
  return (
    <>
      <div className="min-h-screen bg-white">
        <Header />

        <div className="p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
            Mes Films Favoris
          </h1>

          {movies.length === 0 ? (
            <p className="text-gray-500 text-center text-xl mt-10">
              Aucun film en favoris pour le moment
            </p>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {movies.map((film) => (
                <li
                  key={film._id}
                  className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition duration-300"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
                    alt={film.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {film.title}
                    </h2>
                    <p className="text-sm text-gray-500 mt-2 line-clamp-3">
                      {film.description}
                    </p>
                    <button
                      onClick={() => DeleteFav(session.user.id, film._id)}
                      className="btn bg-red-500 btn-ghost btn-block"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
