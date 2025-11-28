import axios from "axios";
import { addAccessToken, handleRequestError, handleResponseOK, handleResponseError } from "./interceptors";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000", // Replace with your API base URL
});

axiosInstance.interceptors.request.use(addAccessToken, handleRequestError);
axiosInstance.interceptors.response.use(handleResponseOK, handleResponseError);

export default axiosInstance;
