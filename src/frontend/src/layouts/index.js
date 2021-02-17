import React, { useState, useMemo } from "react";
import { Grommet, Box } from "grommet";
import theme from "../components/atoms/theme";
import { NotificationContext } from "../components/atoms/context";
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
  return (
    <Grommet theme={theme} full>
      <NotificationContext.Provider value={{ notification, setNotification }}>
        <VisualLayout {...rest}> {children}</VisualLayout>
      </NotificationContext.Provider>
    </Grommet>
  );
};

export default Layout;
