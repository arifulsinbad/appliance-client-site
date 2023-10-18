export const setLoacalStorage = (key: string, token: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  } else {
    return localStorage.setItem(key, token);
  }
};
export const getLoacalStorage = (key: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  } else {
    return localStorage.getItem(key);
  }
};
export const logoutUser = (key: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  } else {
    return localStorage.removeItem(key);
  }
};
