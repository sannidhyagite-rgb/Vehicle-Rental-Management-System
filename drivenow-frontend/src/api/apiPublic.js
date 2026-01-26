// src/api/apiPublic.js
import axios from "axios";

const apiPublic = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiPublic;
