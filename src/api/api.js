import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://lab7-it-agency-server.onrender.com",
  //   baseURL: "http://localhost:5173",
});

export default axiosInstance;
