import axios from "axios";

const API = axios.create({
  //  baseURL: "http://localhost:4000/api/v1",
  baseURL: "https://jobzee-xa3v.onrender.com/api/v1",
  withCredentials: true, 
});

export default API;