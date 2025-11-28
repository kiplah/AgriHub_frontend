import axios from "axios";
import { addAccessToken, handleRequestError, handleResponseOK, handleResponseError } from "./interceptors";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8081",
});

axiosInstance.interceptors.request.use(addAccessToken, handleRequestError);
axiosInstance.interceptors.response.use(handleResponseOK, handleResponseError);

export default axiosInstance;
