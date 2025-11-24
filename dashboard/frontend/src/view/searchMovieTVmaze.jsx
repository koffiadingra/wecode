import { useEffect, useState } from "react";

function SearchMoviesTVmazeForm({ onClose }) {
  const [movie_name, setMovieName] = useState("");
  const [results, setResults] = useState(null);
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const delai = setTimeout(() => {
      fetchData(movie_name);
    }, 300);

    return () => clearTimeout(delai);
  }, [movie_name]);

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

  const fetchData = async (name) => {
    if (!name.trim()) return;
    try {
      const query = encodeURIComponent(name);
      const response = await fetch(
        `https://api.tvmaze.com/search/shows?q=${query}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const jsonData = await response.json();
      setResults(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  const movieSubmit = (event) => {
    event.preventDefault();
    fetchData(movie_name);
  };

  return (
    <div className="mt-4 px-6 py-4 bg-white rounded-lg shadow-md max-h-[500px] overflow-auto">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold text-blue-800">TV Maze</h1>
        <div className="flex justify-end w-32">

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
      </div>
      <div className="flex gap-2 mt-2">
        <label htmlFor="">Timer :</label>
        <input
          type="number"
          min="0"
          value={timer}
          onChange={(e) => setTimer(Number(e.target.value))}
          className="w-14 pl-2 bg-gray-200 rounded border border-gray-700"
        />
        <span>Secondes</span>
      </div>
      <form action="" onSubmit={movieSubmit}>
        <div className="flex justify-between">
          <label className="font-semibold text-xl text-gray-800" htmlFor="">
            Search movie
          </label>
        </div>
        <div className="flex gap-3">
          <input
            className="h-10 w-full bg-gray-300 rounded-lg px-3 my-3"
            type="text"
            placeholder="Search"
            name="movie_name"
            value={movie_name}
            onChange={(e) => setMovieName(e.target.value)}
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 my-3 h-10 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white "
            type="submit"
          >
            Search
          </button>
        </div>
      </form>
      {results && (
        <div className="grid gap-4">
          {results.map((movie, index) => (
            <div key={index} className="bg-blue-200 p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold">{movie.show.name}</h2>
              <img src={movie.show.image?.original} alt="" />
              <p>
                <a className="underline text-lg" href={movie.show.url}>
                  Voir sur TV Maze
                </a>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchMoviesTVmazeForm;
