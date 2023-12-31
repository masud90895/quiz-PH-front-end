import { IUser } from "@/interfaces/IUser";
import { jwtDecode } from "jwt-decode";
export const setToLocalStorage = (key: string, token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, token);
  }
};

export const getFromLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key);
  }
  return null;
};

export const getUserDataFromLC = (): IUser | null => {
  const token = getFromLocalStorage("token");

  if (token && typeof window !== "undefined") {
    const userInfo: IUser = jwtDecode(token);
    return userInfo;
  }
  return null;
};

export const removeFromLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};

export const logout = () => {
  removeFromLocalStorage("token"); // Assuming "user" is the key for the authentication
};
