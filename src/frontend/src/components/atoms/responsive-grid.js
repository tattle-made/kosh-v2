import React, { useContext } from "react";
import { ResponsiveContext, Grid } from "grommet";

export const ResponsiveGrid = ({ children }) => {
  const size = React.useContext(ResponsiveContext);
  console.log(size);

  return size === "small" ? (
    <Grid
      columns={{
        count: 2,
        size: "auto",
      }}
      gap="medium"
    >
      {children}
    </Grid>
  ) : size === "medium" ? (
    <Grid
      columns={{
        count: 4,
        size: "auto",
      }}
      gap="small"
    >
      {children}
    </Grid>
  ) : size === "large" ? (
    <Grid
      columns={{
        count: 6,
        size: "auto",
      }}
      gap="small"
    >
      {children}
    </Grid>
  ) : (
    <Grid
      columns={{
        count: 6,
        size: "auto",
      }}
      gap="small"
    >
      {children}
    </Grid>
  );
};
