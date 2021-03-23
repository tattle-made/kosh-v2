import React from "react";
import {
  ResponsiveContext,
  Grid,
  Box,
  Heading,
  Text,
  CheckBoxGroup,
} from "grommet";

export default function SearchFilter() {
  const size = React.useContext(ResponsiveContext);
  return (
    <Box
      label={"Filter Options"}
      width={{ min: "small" }}
      direction={"row-responsive"}
    >
      <ResponsiveGrid>
        <Box alignContent={"top"}>
          <Heading
            level={2}
            size={"small"}
            margin={{ top: size === "small" ? "none" : undefined }}
          >
            Filter
          </Heading>
        </Box>
        <Box gap={"small"}>
          <Text size={"small"} weight={600}>
            Type
          </Text>
          <CheckBoxGroup options={["Text", "Image", "Video"]} />
        </Box>
        <Box gap={"small"}>
          <Text size={"small"} weight={600}>
            Datasource
          </Text>
          <CheckBoxGroup options={["fearspeech", "factcheck", "checkmate"]} />
        </Box>
        <Box height={"1em"} />
        {/* <Text size={"small"} weight={600}>
          Metadata
        </Text> */}
      </ResponsiveGrid>
    </Box>
  );
}

const ResponsiveGrid = ({ children }) => {
  const size = React.useContext(ResponsiveContext);
  console.log({ size });
  return size === "small" ? (
    <Grid
      columns={{
        count: 4,
        size: "auto",
      }}
      gap="medium"
    >
      {children}
    </Grid>
  ) : (
    <Box direction={"column"} gap="small">
      {children}
    </Box>
  );
};
