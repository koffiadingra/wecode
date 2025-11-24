"use client";
import Head from "../../../components/Head";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";


export default function FilmsDispo() {
  const [data, setData] = useState([]);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      if (session.user.role !== "admin") {
        router.push("/");
      }
    } else {
      router.push("/");
    }
  }, [session]);

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await axios.get("/api/movie");
      setData(response.data.data);
    };
    fetchMovie();
  }, []);

  const DeleteUser = async (id) => {
    try {
      await axios.delete(`/api/movie/${id}`);
      console.log("delete ok");
      setData((e) => e.filter((film) => film._id !== id));
      router.push("/pages/Admin/dispfilm");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Head />
      <div className="flex flex-col rounded-lg border border-slate-200 bg-white md:col-span-3">
        <div className="p-5">
          <div className="min-w-full overflow-x-auto rounded-sm">
            <table className="min-w-full align-middle text-sm">
              <thead>
                <tr className="border-b-2 border-slate-100">
                  <th className="px-3 py-2 text-center text-sm font-semibold tracking-wider text-slate-700 uppercase">
                    Image
                  </th>
                  <th className="min-w-[180px] py-3 pe-3 text-center text-sm font-semibold tracking-wider text-slate-700 uppercase">
                    Titre du film
                  </th>
                  <th className="min-w-[180px] px-3 py-2 text-center text-sm font-semibold tracking-wider text-slate-700 uppercase">
                    Description du film
                  </th>
                  <th className="px-3 py-2 text-center text-sm font-semibold tracking-wider text-slate-700 uppercase">
                    Release date
                  </th>
                  <th className="px-3 py-2 text-center text-sm font-semibold tracking-wider text-slate-700 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id} className="border-b border-slate-100">
                    <td className="py-3 pe-3 text-center text-slate-600 flex justify-center items-center">
                      <img
                        src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                        alt={item.title}
                        className="w-24 h-24"
                      />
                    </td>
                    <td className="py-3 pe-3 text-center text-slate-600">
                      {item.title}
                    </td>
                    <td className="p-3 font-medium text-slate-600 max-w-xs overflow-hidden whitespace-nowrap truncate">
                      {item.description}
                    </td>
                    <td className="p-3 font-medium text-center">
                      <div className=" text-xs leading-4 font-semibold text-rose-800">
                        <p>{item.release_date}</p>
                      </div>
                    </td>
                    <td className="text-center">
                      <button
                        onClick={() => DeleteUser(item._id)}
                        className="border p-2 border-white bg-red-400 hover:bg-red-600 rounded-xl"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
