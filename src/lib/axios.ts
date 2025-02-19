import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com", // You can change this to your API's base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
