import axios from "axios";

const API = axios.create({
  baseURL:
    "https://expense-tracker-2-fwas.onrender.com",
});

export default API;