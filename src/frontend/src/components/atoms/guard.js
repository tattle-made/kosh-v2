import React, { useContext } from "react";
import { UserContext } from "./context";

const GuardFactory = ({ role, children }) => {
  const { user, setUser } = useContext(UserContext);
  if (role === "admin") {
    return user.role === "admin" ? <>{children}</> : null;
  } else if (role === "reader") {
    return user.role === "reader" ? <>{children}</> : null;
  } else if (role === "author") {
    return user.role === "author" ? <>{children}</> : null;
  } else if (role === "adminOrAuthor") {
    return user.role === "admin" || user.role === "author" ? (
      <>{children}</>
    ) : null;
  }
};

const Admin = ({ children }) => (
  <GuardFactory role={"admin"}>{children}</GuardFactory>
);
const Viewer = ({ children }) => (
  <GuardFactory role={"reader"}>{children}</GuardFactory>
);
const Author = ({ children }) => (
  <GuardFactory role={"author"}>{children}</GuardFactory>
);
const AdminOrAuthor = ({ children }) => (
  <GuardFactory role={"adminOrAuthor"}>{children}</GuardFactory>
);
export { Admin, Viewer, Author, AdminOrAuthor };
