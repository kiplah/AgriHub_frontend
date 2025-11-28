export const setCookie = (name, value, expiresIn) => {
  if (typeof document === "undefined") return; // Ensure document is available

  const d = new Date();
  d.setTime(d.getTime() + expiresIn * 1000);
  document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`;
};

export const getCookie = (name) => {
  if (typeof document === "undefined") return null; // Ensure document is available

  const cookieArr = document.cookie.split(";");
  for (let i = 0; i < cookieArr.length; i++) {
    const cookiePair = cookieArr[i].split("=");
    if (name === cookiePair[0].trim()) {
      return decodeURIComponent(cookiePair[1]);
    }
  }
  return null;
};

export const deleteCookie = (name) => {
  if (typeof document === "undefined") return; // Ensure document is available

  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`;
};
