import axios from "axios";

export const APIInstance = axios.create({
    withCredentials: true,
    baseURL: 'http://192.168.1.103:8000/admin'
});