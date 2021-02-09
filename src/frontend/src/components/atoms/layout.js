import React, { useState, useEffect } from "react";
import { Grommet, Box } from "grommet";
import theme from "./theme";

/**
 * @author
 * @function Layout
 **/

const Layout = ({ children }) => {
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setFetching(true);
  });

  return (
    <Grommet theme={theme} full>
      <Box file direction={"column"}>
        {children}
      </Box>
    </Grommet>
  );
};

export default Layout;
