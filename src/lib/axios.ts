// lib/axiosInstance.ts
import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com', // You can change this to your API's base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;