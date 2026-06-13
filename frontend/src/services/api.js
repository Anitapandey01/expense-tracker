import axios from "axios";

const API = axios.create({
  baseURL:
    "https://expense-tracker-mamc.onrender.com",
});

export default API;