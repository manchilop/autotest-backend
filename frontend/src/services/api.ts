import axios from "axios";

export const api = axios.create({
  baseURL: "http://YOUR_BACKEND_URL",
  headers: {
    "Content-Type": "application/json",
  },
});