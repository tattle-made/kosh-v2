import React from "react";
import { navigate } from "gatsby";
import { isLoggedIn } from "../../service/user-authentication";

export const PrivateRoute = ({ component: Component, location, ...rest }) => {
  if (!isLoggedIn() && location.pathname !== `/app/login`) {
    navigate("/app/login");
    return null;
  }
  return <Component location={location} {...rest} />;
};

const pagesDisabledForLoggedInUser = [
  "/app/login",
  "/app/sign-up",
  "/app/email-verification",
];

export const DisabledForLoggedInUser = ({
  component: Component,
  location,
  ...rest
}) => {
  if (
    isLoggedIn() &&
    pagesDisabledForLoggedInUser.includes(location.pathname)
  ) {
    navigate("/app/datasource");
    return null;
  }
  return <Component {...rest} />;
};

// OnlyVisibleRouteForNotLoggedInUser
