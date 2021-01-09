import axios from "axios";

export const APIInstance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8080/admin'
});