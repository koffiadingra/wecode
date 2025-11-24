"use client";
import { Suspense } from 'react';
import { useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MovieDetails() {
  const { data: session } = useSession();
  const [re, setRe] = useState(1);

  ///// recuperation des commentaire
  const [comments, setComments] = useState([]);

  const router = useRouter();

  //Reccuperation de l'ID passée en paramettre
  const searchParams = useSearchParams();
  const id = searchParams.get("req");

  //Reccuperation de l'ID passée en paramettre
  const [movie, setMovie] = useState({});
  useEffect(() => {
    async function reccuperation() {
      const res = await fetch(`http://localhost:3000/api/movie/${id}`);
      const data = await res.json();
      setMovie(data.data);
    }
    reccuperation();
  }, []);

  ////Reccuperation des commentaires
  useEffect(() => {
    async function reccuperationComment() {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      const resComments = await fetch(
        `http://localhost:3000/api/commentaires/${id}`,
        requestOptions
      );
      const dataComments = await resComments.json();
      setComments(dataComments.data.reverse());
    }
    reccuperationComment();
  }, [re]);

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [note, setNote] = useState(0);
  const [noteChange, setNoteChange] = useState(0);
  const [verificationUserNoted, setVerificationUserNoted] = useState(true);
  const [noteAttribue, setNoteAttribue] = useState(0);

  ////Ajout d'une note
  const ajoutDeNote = (note) => {
    if (!session) {
      router.push("/pages/login");
    }
    setRating(note);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        note: note,
        userId: session.user.id,
        movieId: id,
      }),
    };
    async function envoieDeLaNote() {
      const res = await fetch("http://localhost:3000/api/notes", options);
    }
    envoieDeLaNote();
    console.log(note);
    setNoteChange(note);
  };

  ////Reccuperation des notes
  useEffect(() => {
    async function reccuperationNote() {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      const resComments = await fetch(
        `http://localhost:3000/api/notes/${id}`,
        requestOptions
      );
      const dataComments = await resComments.json();
      //console.log(dataComments);

      let moy = 0;
      for (let index = 0; index < dataComments.data.length; index++) {
        const element = parseInt(dataComments.data[index].note);
        moy += element;
        if (dataComments.data[index].userId === session.user.id || verificationUserNoted) {
          setVerificationUserNoted(false)
           setNoteAttribue(dataComments.data[index].note)
        }
      }
      console.log(moy / dataComments.data.length);
      setNote(Math.floor(moy / dataComments.data.length) + "");
    }
    reccuperationNote();
  }, [noteChange, session]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!session) {
      router.push("/pages/login");
    }
    if (comment.trim() !== "" && session.user.id && session.user.name) {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          userId: session.user.id,
          username: session.user.name,
          movieId: id,
        }),
      };
      async function ajoutDeCommentaire() {
        const res = await fetch(
          "http://localhost:3000/api/commentaires",
          options
        );
      }
      ajoutDeCommentaire();
      setRe(comment + "tt");
      setComment("");
    }
  };

  /////delete an comments
  async function deleteMyComments(e) {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(
      "http://localhost:3000/api/commentaires/" + e,
      options
    );
    setRe(e);
    console.log(await res.json());

    if (res.status === 201) {
      console.log("delete");
    }
  }
  ////////////////////////////////////////
  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-xl overflow-hidden mb-6">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt={movie.title}
          className="w-full md:w-1/3 object-cover"
        />
        <div className="p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {movie.title}
            </h1>
            <p className="text-gray-500 mb-2">
              <span className="underline">Release Date</span> {": "}
              {movie.release_date} • <span className="underline">Populary</span>
              {": "}
              {movie.popularity}
            </p>
            <p className="text-gray-700 mb-4">{movie.description}</p>
            <p className="text-yellow-500 font-semibold">
              Note moyenne : {note}★ / 5★
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-3">Donner une note</h2>
        {verificationUserNoted == true ? (  
        <div className="flex space-x-2 mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              onClick={() => ajoutDeNote(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              xmlns="http://www.w3.org/2000/svg"
              fill={star <= (hoverRating || rating) ? "gold" : "none"}
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-8 h-8 cursor-pointer transition"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.449a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.449a1 1 0 00-1.175 0l-3.37 2.449c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.075 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.274-3.957z"
              />
            </svg>
          ))}
        </div>
        ):(<p >Vous avez deja noté ce film( <span className="text-yellow-500 font-semibold">{noteAttribue}★</span> )</p> )}
        {rating > 0 && (
          <p className="text-gray-600">Vous avez noté : {rating} étoiles</p>
        )}
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Commentaires</h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-2 mb-4"
        >
          <input
            type="text"
            placeholder="Votre commentaire..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
          />
          <button
            type="submit"
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Envoyer
          </button>
        </form>

        <div className="space-y-3">
          {comments.map((c) => (
            <div key={c._id} className="bg-gray-100 rounded-lg p-3 shadow-sm">
              <p className="font-semibold text-gray-800">{c.username}</p>

              <p className="text-gray-600 flex ">
                {c.content}
                {session ? (
                  <p
                    className="ml-auto text-red-500"
                    onClick={() => deleteMyComments(c._id)}
                  >
                    {c.userId == session.user.id && (
                      <svg
                        className="size-5 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 640"
                      >
                        <path d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z" />
                      </svg>
                    )}
                  </p>
                ) : (
                  <p></p>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
