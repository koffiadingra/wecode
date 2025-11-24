import axios from "axios";

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
  const res = await axios.get(`${BASE_URL}/movie/popular`, {
    params: { api_key: TMDB_API_KEY, language: "fr-FR" },
  });
  return res.data.results;
};

