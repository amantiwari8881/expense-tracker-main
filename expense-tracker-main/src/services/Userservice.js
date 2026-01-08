// import axios from "axios";
// import { serverBaseURL } from "../config/config";
// import { axiosInstance } from "../utils/AxiosHelper";

// export const loginUser = async (loginData) => {
//   const response = await axiosInstance.post(`/auth/login`, loginData);

//   return response.data;
// };




import axios from "axios";
import { serverBaseURL } from "../config/config";
import { axiosInstance } from "../utils/AxiosHelper";

// function create user:
export const createUser = async (userObject) => {
  const response = await axiosInstance.post(`/auth/register`, userObject);
  return response.data;
};