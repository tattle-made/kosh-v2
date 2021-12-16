import { post } from "./backend";
import axios from "axios";

export const signUp = async (email, password) => {
  try {
    const response = await post("/auth/signup", { email, password });
    return response.data;
  } catch (err) {
    console.log("Error Signing up", err);
    throw new Error(err.response.data.error);
  }
};
export const emailVerification = async (token) => {
  try {
    const response = await axios.get(`/auth/email-verification?token=${token}`);
    return response.data;
  } catch (err) {
    console.log("Error Verifying Token", err);
    throw new Error(err.response.data.error);
  }
};

export const login = async (email, password) => {
  try {
    const response = await post("/auth/login", { email, password });
    setUser(response.data);
    return response.data;
  } catch (error) {
    console.log("Error Logging in into server", error);
    throw new Error("Error Logging in");
  }
};
// login;
// refreshToken;
// logout;

export const isBrowser = () => typeof window !== "undefined";

export const getUser = () =>
  isBrowser() && window.localStorage.getItem("kosh-user")
    ? JSON.parse(window.localStorage.getItem("kosh-user"))
    : {};

export const setUser = (user) =>
  window.localStorage.setItem("kosh-user", JSON.stringify(user));

export const isLoggedIn = () => {
  const user = getUser();
  return !!user.id;
};

export const logout = (callback) => {
  setUser({});
};
