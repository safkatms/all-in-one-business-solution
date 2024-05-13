import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const TOKEN_KEY = "jwtToken";

export const getToken = () => {
  return Cookies.get(TOKEN_KEY);
};

export const setToken = (token: any) => {
  Cookies.set(TOKEN_KEY, token);
};

export const removeToken = () => {
  Cookies.remove(TOKEN_KEY);
};

export const isAuthenticated = () => {
  const token = getToken();
  return !!token;
};

export const getUserRole = () => {
  const token = getToken();
  if (!token) {
    return null;
  }
  try {
    const decodedToken: { userType: string } = jwtDecode(token);
    return decodedToken.userType;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export const hasRole = (roles: string | string[]) => {
  const userRole = getUserRole();
  if (!userRole) {
   return false;
  }
  const targetRoles = Array.isArray(roles) ? roles : [roles];
  return targetRoles.some((role) => userRole === role);
};
