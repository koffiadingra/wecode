import React, { useState, useEffect } from "react";

function CountryInfo({ onClose }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
      if (intervalId) clearInterval(intervalId);
      if (timer > 0) {
        const id = setInterval(() => {
          fetchData();
        }, timer * 1000);
        setIntervalId(id);
        return clearInterval(id);
      }
    }, [timer]);

  const searchCountry = async (countryName) => {
    if (!countryName.trim()) {
      setData([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}`
      );
      if (!response.ok) {
        throw new Error("country no found");
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    searchCountry(searchQuery);
  };

  return (
    <div className="mt-4 px-6 py-4 bg-white rounded-lg shadow-md max-h-[500px] w-96">
      <div className="flex justify-between">
        <div className="flex gap-2 mt-2">
        <label htmlFor="">Timer :</label>
        <input
          type="number"
          min="0"
          value={timer}
          onChange={(e) => setTimer(Number(e.target.value))}
          className="w-10 pl-2 bg-gray-200 rounded border border-gray-700"
        />
        <span>Secondes</span>
      </div>
        <button onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            width={30}
          >
            <path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z" />
          </svg>
        </button>
      </div>
      <form onSubmit={handleSearchSubmit} className="mb-6 max-w-md mt-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="cote d'ivoire, benin..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            search
          </button>
        </div>
      </form>

      <div className="w-full max-w-4xl">
        {loading && <p className="text-center text-blue-600">loading...</p>}
        {error && <p className="text-center text-red-500"> {error}</p>}

        <div className="flex flex-wrap gap-6 justify-center mt-4">
          {data.map((item) => (
            <div
              key={item.name.common}
              className="border-4 border-[#00FF00] bg-white p-6 rounded-lg shadow-md w-64"
            >
              <h3 className="font-bold text-xl mb-2 text-gray-800">
                {item.name.common}
              </h3>
              <p className="text-gray-600">
                <strong>Population :</strong> {item.population.toLocaleString()}
              </p>
              <p className="text-gray-600">
                <strong>Indicatif :</strong> {item.idd?.root || ""}
                {item.idd?.suffixes?.join("") || "N/A"}
              </p>
              <p className="text-gray-600">
                <strong>Langues :</strong>{" "}
                {item.languages
                  ? Object.values(item.languages).join(", ")
                  : "Non spécifiées"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CountryInfo;
