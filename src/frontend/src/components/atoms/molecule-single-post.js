import React from "react";
import { Grommet, Box, Heading, Text } from "grommet";
import SinglePost from "./single-post";

const spinning = (
  <svg
    version="1.1"
    viewBox="0 0 32 32"
    width="22px"
    height="22px"
    fill="#333333"
  >
    <path
      opacity=".25"
      d="M16 0 A16 16 0 0 0 16 32 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 16 28 A12 12 0 0 1 16 4"
    />
    <path d="M16 0 A16 16 0 0 1 32 16 L28 16 A12 12 0 0 0 16 4z">
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 16 16"
        to="360 16 16"
        dur="0.8s"
        repeatCount="indefinite"
      />
    </path>
  </svg>
);

/**
* @author denny
* @function MoleculeDuplicatePost
status : default, loading, error
message : text depending on status
**/

const MoleculeSinglePost = ({ visible, title, data }) => {
  return (
    <Box>
      <Box direction={"row"} align={"center"} gap={"medium"}>
        <Heading level={4}>{title}</Heading>
        {data.status == "loading" && spinning}
      </Box>

      {data.status === "default" ? (
        <Box> </Box>
      ) : data.status === "data" && visible ? (
        <SinglePost
          type={data.type}
          src={data.mediaUrl}
          heading={data.heading}
          body={data.body}
        />
      ) : data.status === "error" ? (
        <Box>
          <SinglePost type="error" />
          <Box margin={{ top: "xsmall" }}>
            <Text size={"xsmall"}> Error loading data </Text>
          </Box>
        </Box>
      ) : (
        <Box></Box>
      )}
    </Box>
  );
};

export default MoleculeSinglePost;
