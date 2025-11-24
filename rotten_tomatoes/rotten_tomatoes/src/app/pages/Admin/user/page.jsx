"use client";

import { useState, useEffect } from "react";
import Head from "../../../components/Head";
import CreateForm from "@/app/components/Create";
import UpdateFormadmin from "@/app/components/UpdateUseradmin";
import axios from "axios";
export default function Dash({ children }) {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOp, setIsOp] = useState(false);
  const [idUser, setidUser] = useState("");

  const UpdateUser = async (id) => {
    const idd = await id;
    setidUser(idd);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/users");

        console.log(response.data);

        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const DeleteUser = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`);

      setData((e) => e.filter((user) => user._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head />
      <div className="flex flex-col rounded-lg border border-slate-200 bg-white md:col-span-3">
        <div className="w-full h-full flex end justify-end">
          <button
            onClick={() => setIsOpen(true)}
            className="border p-3 border-white bg-green-600 rounded-xl text-white hover:bg-green-500 mr-5 mt-5"
          >
            + Ajouter utilisateur
          </button>
        </div>
        <div className="p-5">
          <div className="min-w-full overflow-x-auto rounded-sm">
            <table className="min-w-full align-middle text-sm">
              <thead>
                <tr className="border-b-2 border-slate-100">
                  <th className="min-w-[180px] py-3 pe-3 text-start text-sm font-semibold tracking-wider text-slate-700 uppercase">
                    Nom de l'utilisateur
                  </th>
                  <th className="min-w-[180px] px-3 py-2 text-start text-sm font-semibold tracking-wider text-slate-700 uppercase">
                    Email de l'utilisateur
                  </th>
                  <th className="px-3 py-2 text-start text-sm font-semibold tracking-wider text-slate-700 uppercase">
                    Rôle
                  </th>
                  <th className="px-3 py-2 text-start text-sm font-semibold tracking-wider text-slate-700 uppercase">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((user) => (
                  <tr key={user.id} className="border-b border-slate-100">
                    <td className="py-3 pe-3 text-start text-slate-600">
                      {user.username}
                    </td>
                    <td className="p-3 font-medium text-slate-600">
                      {user.email}
                    </td>
                    <td className="p-3 font-medium">
                      <div className="inline-block rounded-full bg-rose-100 px-2 py-1 text-xs leading-4 font-semibold text-rose-800">
                        {user.role}
                      </div>
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          setIsOp(true);
                          UpdateUser(user._id);
                        }}
                        className="border p-2 border-white bg-amber-300 hover:bg-amber-500 rounded-xl mr-2"
                      >
                        Modifier
                      </button>

                      <button
                        onClick={() => DeleteUser(user._id)}
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
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="bg-white p-6 rounded-lg shadow-xl relative z-50">
            {children}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
            <CreateForm />
          </div>
        </div>
      )}
      {isOp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setIsOp(false)}
          ></div>
          <div className="bg-white p-6 rounded-lg shadow-xl relative z-50">
            {children}
            <button
              onClick={() => setIsOp(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
            <UpdateFormadmin id={idUser} />
          </div>
        </div>
      )}
    </>
  );
}
