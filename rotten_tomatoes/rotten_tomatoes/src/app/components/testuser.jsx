"use client";

import { useState, useEffect } from "react";
import axios from "axios";
function MyComponent() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const deleteuser = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/users/${id}`);
        setData(response.data);

      setError(error);
    } catch (error) {
      console.log(error);
    }finally {
        setLoading(false);
      }
  };
  const updateuser = async (id) => {
    const data ={
      username: username,
      email: email,
      password:password
    }
    try{
      await axios.put(`http://localhost:3000/api/users/${id}`,data);

    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users");
        setData(response.data);
        // console.log(response.data);

        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  return (
    <ul>
      {data.map((item) => {
        return (
          <div>
            <li key={item.id}>
              {item.username}-{item.email}
              <button onClick={()=>deleteuser(item._id)}>delete</button>
              {/* <button onClick={()=>updateuser(item._id)}>delete</button> */}
            </li>
            <form onSubmit={()=> updateuser(item._id)}>
              <input type="text"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="name"
              className="bg-transparent text-gray-800 placeholder-gray-500/80 outline-none text-sm w-full h-full"
              />
              <input type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="bg-transparent text-gray-800 placeholder-gray-500/80 outline-none text-sm w-full h-full"
              />
              <input type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              className="bg-transparent text-gray-800 placeholder-gray-500/80 outline-none text-sm w-full h-full"
              />
              <button onClick={()=>updateuser(item._id)}>update</button>
            </form>
          </div>
        );
      })}
    </ul>
  );
}
export default MyComponent;
