import React, { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://restcountries.com/v3.1/name/benin"
        );
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    // <div>
    //   <h1>Liste</h1>
    //   <ul>
    //     {data.map(item => (
    //       <li key={item.id}>{item.name.common}</li>
    //     ))}
    //   </ul>
    // </div>
    <div class="flex flex-wrap gap-6 justify-center mt-8">
      <div class="border-4 border-[#00FF00] bg-white p-6 rounded-lg shadow-md w-64">
        <h3 class="font-bold text-xl mb-2 text-gray-800">Green Border</h3>
        {data.map(item => (
        <p class="text-gray-600" key={item.id}>
          {item.name.common}
        </p>
        ))}
      </div>
    </div>
  );
}

export default App;
