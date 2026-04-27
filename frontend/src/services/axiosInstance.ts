import axios from "axios";
import { getToken } from "../utils/jwt";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
});

axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    console.log("INTERCEPTOR HIT");

    const status = err.response?.status;
    console.log("STATUS:", status);

    if (status === 401 || status === 403) {
      console.log("REDIRECTING...");
      localStorage.removeItem("token");
      window.location.href = "/auth";
    }

    return Promise.reject(err);
  }
);


export default axiosInstance;