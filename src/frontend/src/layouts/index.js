import React, { useState, useMemo } from "react";
import { Grommet, ResponsiveContext, Box } from "grommet";
import theme from "../components/atoms/theme";
import {
  NotificationContext,
  SearchContext,
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

  return (
    <Grommet theme={theme} full>
      <NotificationContext.Provider value={{ notification, setNotification }}>
        <SearchContext.Provider value={{ search, setSearch }}>
          <VisualLayout {...rest}> {children}</VisualLayout>
        </SearchContext.Provider>
      </NotificationContext.Provider>
    </Grommet>
  );
};

export default Layout;
