import axios from "axios";

const baseURL = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_API_KEY;

// trending
export const fetchTrending = async (timeWindow = "day") => {
  const res = await axios.get(
    `${baseURL}/trending/all/${timeWindow}?api_key=${apiKey}`
  );
  return res;
};
