import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api",
});

// REQUEST
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// RESPONSE
API.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err.response?.status;

    if (status === 401 || status === 403) {
      localStorage.removeItem("token");
      window.location.replace("/auth");
    }

    return Promise.reject(err);
  }
);

export default API;