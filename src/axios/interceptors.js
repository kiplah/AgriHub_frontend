// src/axios/interceptors.js

import store from "../store/store";
import { refreshToken, logout } from "../reducers/Auth/authSlice";
import { getCookie } from "../utilities/utils";

// Make sure to export this function
export const addAccessToken = async (config) => { 
  const accessToken = store.getState().auth.token || getCookie("access_token");
  
  // Only add token for protected routes
  const publicRoutes = ['/getallcategories', '/getallproducts', '/Product/', '/search-bar', '/login', '/signup', '/verify', '/contact-us'];
  const isPublicRoute = publicRoutes.some(route => config.url.includes(route));
  
  if (accessToken && !isPublicRoute) {
    config.headers.Authorization = `Bearer ${accessToken}`;
    console.log("Interceptor added token:", accessToken);
  }
  return config;
};

export const handleRequestError = (error) => {
  return Promise.reject(error);
};
// ... rest of the file
