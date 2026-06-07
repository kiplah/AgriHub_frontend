import axios from "axios";
import { addAccessToken, handleRequestError, handleResponseOK, handleResponseError } from "./interceptors";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
export const WS_BASE_URL = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8081";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use(addAccessToken, handleRequestError);
axiosInstance.interceptors.response.use(handleResponseOK, handleResponseError);

export default axiosInstance;
