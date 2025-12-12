import { getCookie } from "../utilities/utils";

export const addAccessToken = async (config) => {
  let accessToken = null;

  // Try getting token from localStorage if on client side
  if (typeof window !== "undefined") {
    accessToken = localStorage.getItem("access_token");
  }

  // Fallback to cookie if needed (existing logic)
  if (!accessToken) {
    accessToken = getCookie("access_token");
  }

  // Only add token for protected routes
  const publicRoutes = [
    '/getallcategories',
    '/getallproducts',
    '/Product/',
    '/category/',
    '/products/',
    '/search-bar',
    '/login/',
    '/signup/',
    '/verify/',
    '/contact-us',
    '/users/forgot_password/',
    '/users/reset_password/',
    '/users/resend_verification/'
  ];

  const isPublicRoute = publicRoutes.some(route => config.url && config.url.includes(route));

  if (accessToken && !isPublicRoute) {
    config.headers.Authorization = `Bearer ${accessToken}`;
    // console.log("Interceptor added token"); // Reduced noise
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
