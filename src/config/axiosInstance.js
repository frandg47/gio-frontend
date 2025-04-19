import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://gio-backend.onrender.com/"
})