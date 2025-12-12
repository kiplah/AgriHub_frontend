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

  // Only omit token for strictly public auth/utility routes
  const publicRoutes = [
    '/login/',
    '/signup/',
    '/verify/',
    '/contact-us/',
    '/users/forgot_password/',
    '/users/reset_password/',
    '/users/resend_verification/'
  ];

  const isPublicRoute = publicRoutes.some(route => config.url && config.url.includes(route));

  // Debugging 401 errors
  console.log(`[Interceptor] URL: ${config.url}, TokenFound: ${!!accessToken}, IsPublic: ${isPublicRoute}`);

  if (accessToken && !isPublicRoute) {
    config.headers.Authorization = `Bearer ${accessToken}`;
    console.log("[Interceptor] Token attached to header");
  } else {
    console.log("[Interceptor] Token NOT attached");
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

    // Auto-logout if token is invalid or expired
    if (error.response.status === 401) {
      if (typeof window !== "undefined") {
        console.log("Session expired. logging out...");
        localStorage.removeItem("access_token");
        localStorage.removeItem("user_role");
        localStorage.removeItem("userId");
        localStorage.removeItem("token_expiration");
        localStorage.removeItem("user_email");
        window.location.href = "/login";
      }
    }
  } else if (error.request) {
    // The request was made but no response was received
    console.error("Request:", error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error("Error Message:", error.message);
  }
  return Promise.reject(error);
};
