import React, { useState, useMemo } from "react";
import { Grommet, ResponsiveContext, Box } from "grommet";
import theme from "../components/atoms/theme";
import {
  NotificationContext,
  SearchContext,
  UserContext,
} from "../components/atoms/context";
import VisualLayout from "./visual-layout";

const publicPages = ["/terms-of-service", "/privacy-notice", "/about"];

/**
 * @author
 * @function Layout
 **/

const Layout = ({ children, ...rest }) => {
  const [notification, setNotification] = useState({
    visibility: false,
    medium: "",
  });

  const [search, setSearch] = useState({
    visibility: false,
    payload: {},
  });

  const [user, setUser] = useState({
    user: null,
  });
  return (
    <Grommet theme={theme} full>
      <UserContext.Provider value={{ user, setUser }}>
        <NotificationContext.Provider value={{ notification, setNotification }}>
          <SearchContext.Provider value={{ search, setSearch }}>
            <VisualLayout {...rest}> {children}</VisualLayout>
          </SearchContext.Provider>
        </NotificationContext.Provider>
      </UserContext.Provider>
    </Grommet>
  );
};

export default Layout;
