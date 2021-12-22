import { createContext } from "react";

/**
 * default value of the user context is an empty object
 * an initialized user's shape would be {id, email, username, role, token}
 */
export const UserContext = createContext({});

export const NotificationContext = createContext({
  visibility: false,
  message: "",
});

export const SearchContext = createContext({
  visibility: false,
  payload: {},
});
