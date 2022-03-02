import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:3000",
  headers: {
    Accept: "application/json",
    'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
   
  },
});

export default API;
