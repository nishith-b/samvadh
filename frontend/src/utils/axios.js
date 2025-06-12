import axios from "axios";
import { BASE_URL } from "./api-services";

// Create axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

//Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        console.error("Unauthorized! Redirect to login.");
        window.location.href = "/login";
      } else if (status === 500) {
        console.error("Internal Server Error");
      } else {
        console.error(
          "API Error:",
          error.response.data?.message || "Unknown error"
        );
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timed out");
    } else {
      console.error("Network or unknown error", error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
