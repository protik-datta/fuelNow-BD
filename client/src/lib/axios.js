import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const bdApi = axios.create({
  baseURL: "https://bdapi.vercel.app/api/v.1",
});
