import axios from "axios";
import { serverBaseURL } from "../config/config";
import {
    getAccessTokenFromLocalStorage, 
} from "../services/LocalStorageService";



export const axiosInstance=axios.create({
    baseURL:serverBaseURL,
});

axiosInstance.interceptors.request.use(
    function (config) {
       const accessToken =getAccessTokenFromLocalStorage();

       if(accessToken){
        config.headers["Authorization"]=accessToken;
       }
       return config;
    },
    function (error) {
        return Promise.reject(error);
    }
    
);