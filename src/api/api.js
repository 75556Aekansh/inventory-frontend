import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL||"https://inventory-backend-u5ld.onrender.com/api", 
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
