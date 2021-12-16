import React, { useContext } from "react";
import { UserContext } from "./context";

const Guard = ({ role, children }) => {
  const user = useContext(UserContext);
  if (role === "admin") {
    return user.role === "admin" ? <Box>{children}</Box> : null;
  } else if (role === "viewer") {
    return user.role === "viewer" ? <Box>{children}</Box> : null;
  } else if (role === "uploader") {
    return user.role === "uploader" ? <Box>{children}</Box> : null;
  } else if (role === "adminOrUploader") {
    return user.role === "adminOrUploader" ? <Box>{children}</Box> : null;
  }
};

const Admin = <Guard role={"admin"} />;
const Viewer = <Guard role={"viewer"} />;
const Uploader = <Guard role={"uploader"} />;
const AdminOrUploader = <Guard role={"adminOrUploader"} />;

export { Admin, Viewer, Uploader, AdminOrUploader };
