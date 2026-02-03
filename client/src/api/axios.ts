import axios, { isAxiosError } from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (isAxiosError(error) && error.response) {
      console.error("API Error:", error.response.data.message || error.message);
      return Promise.reject(
        new Error(error.response.data.message || "An API error occurred"),
      );
    }
    return Promise.reject(error);
  },
);
