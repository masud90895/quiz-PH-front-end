import { jwtDecode } from "jwt-decode";
export const setToLocalStorage = (key: string, token: string) => {
  if (!key && typeof window === "undefined") {
    return "";
  }
  return localStorage.setItem(key, token);
};

export const getFromLocalStorage = (key: string) => {
  if (!key && typeof window === "undefined") {
    return "";
  }
  return localStorage.getItem(key);
};

type IUserInfo = {
  id: string;
  email: string;
  role: string;
};
export const getUserDataFromLC = (): IUserInfo | null => {
  const token = getFromLocalStorage("token");

  if (token && typeof window !== "undefined") {
    const userInfo: IUserInfo = jwtDecode(token);
    return userInfo;
  }
  return null;
};

export const removeFromLocalStorage = (key: string) => {
  if (!key && typeof window === "undefined") {
    return;
  }
  localStorage.removeItem(key);
};

export const logout = () => {
  removeFromLocalStorage("token"); // Assuming "user" is the key for the authentication
};
