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

//Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    //Handle common errors globally
    if (error.response) {
      if (error.response.status === 401) {
        // Handle unauthorized access (e.g., redirect to login)
        console.error("Unauthorized! Redirect to login or refresh token.");
        window.location.href = "/login";
      }
    } else if (error.response.status === 500) {
      console.error("Network/Server error:", error);
    } else if (error.code === "ECONNABORTED") {
      console.error("Network/Server error:", error);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
