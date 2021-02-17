import React from "react";
import { ResponsiveContext, Box, Text } from "grommet";

export const ContentSection = ({ children }) => {
  return <Box pad={"medium"}>{children} </Box>;
};

export const Section = ({ children }) => {
  return <Box margin={{ top: "small", bottom: "small" }}>{children}</Box>;
};

export const BlockSection = ({ children }) => {
  const size = React.useContext(ResponsiveContext);

  return size === "small" ? (
    <Box width={"100%"}>{children}</Box>
  ) : (
    <Box width={"medium"}>{children}</Box>
  );
};
