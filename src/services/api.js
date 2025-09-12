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

// details movies and series
export const fetchDetails = async (type, id) => {
  const res = await axios.get(`${baseURL}/${type}/${id}?api_key=${apiKey}`);
  return res?.data;
};

// credits movies and series
export const fetchCredits = async (type, id) => {
  const res = await axios.get(
    `${baseURL}/${type}/${id}/credits?api_key=${apiKey}`
  );
  return res?.data;
};

// videos movies and series
export const fetchVideos = async (type, id) => {
  const res = await axios.get(
    `${baseURL}/${type}/${id}/videos?api_key=${apiKey}`
  );
  return res?.data;
};
