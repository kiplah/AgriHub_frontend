import store from "../store/store";
import { getCookie } from "../utilities/utils";

export const addAccessToken = async (config) => {
  const accessToken = store.getState().auth.token || getCookie("access_token");

  // Only add token for protected routes
  const publicRoutes = [
    '/getallcategories',
    '/getallproducts',
    '/Product/',
    '/search-bar',
    '/login/',
    '/signup/',
    '/verify/',
    '/contact-us',
    '/users/forgot_password/',
    '/users/reset_password/',
    '/users/resend_verification/'
  ];

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

export const handleResponseOK = (response) => {
  return response;
};

export const handleResponseError = (error) => {
  console.error("Axios Response Error:", error);
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error("Data:", error.response.data);
    console.error("Status:", error.response.status);
    console.error("Headers:", error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    console.error("Request:", error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error("Error Message:", error.message);
  }
  return Promise.reject(error);
};
