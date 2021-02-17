import { createContext } from "react";

export const UserContext = createContext({ user: null, setUser: null });
export const NotificationContext = createContext({
  visibility: false,
  message: "",
});
