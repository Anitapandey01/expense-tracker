import axios from "axios";

const API = axios.create({
  baseURL:
"https://expense-tracker-api.onrender.com"
});

export default API;