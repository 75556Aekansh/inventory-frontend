import axios from "axios";

const API = axios.create({
  baseURL: "https://inventory-backend.onrender.com/api", 
});

// Add JWT token to headers
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
