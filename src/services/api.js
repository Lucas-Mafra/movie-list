import axios from "axios";

export const imgPath500w = "https://image.tmdb.org/t/p/w500";
export const imgPathOriginal = "https://image.tmdb.org/t/p/original";

const baseURL = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_API_KEY;

// trending
export const fetchTrending = async (timeWindow = "day") => {
  const { data } = await axios.get(
    `${baseURL}/trending/all/${timeWindow}?api_key=${apiKey}`
  );
  return data?.results;
};
