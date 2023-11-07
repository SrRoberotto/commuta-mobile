import axios from "axios";

export default axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://192.168.0.10:8000/api',
  headers: {
    'Accept': 'application/json',
    "Content-type": "application/json"
  }
});