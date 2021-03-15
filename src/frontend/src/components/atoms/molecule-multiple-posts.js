import React from "react";
import { Box, Heading, Text } from "grommet";
import SinglePost from "./single-post";
const { ResponsiveGrid } = require("./responsive-grid");

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
* @function MoleculeSemanticallySimilarPost
status : default, loading, error
message : text depending on status
**/

const emptyData = {
  status: "data",
  posts: [
    { id: 1, type: "image" },
    { id: 2, type: "image" },
    { id: 3, type: "image" },
    { id: 4, type: "image" },
    { id: 5, type: "image" },
    { id: 6, type: "image" },
    { id: 7, type: "image" },
    { id: 8, type: "image" },
    { id: 9, type: "image" },
    { id: 10, type: "image" },
    { id: 11, type: "image" },
    { id: 12, type: "image" },
    { id: 13, type: "image" },
    { id: 14, type: "image" },
    { id: 15, type: "image" },
    { id: 16, type: "image" },
    { id: 17, type: "image" },
    { id: 18, type: "image" },
    { id: 19, type: "image" },
    { id: 20, type: "image" },
    { id: 21, type: "image" },
    { id: 22, type: "image" },
    { id: 23, type: "image" },
    { id: 24, type: "image" },
    { id: 25, type: "image" },
    { id: 26, type: "image" },
    { id: 27, type: "image" },
    { id: 28, type: "image" },
    { id: 29, type: "image" },
    { id: 30, type: "image" },
  ],
};

const MoleculeMultiplePosts = ({ title, data }) => {
  return (
    <Box>
      {/* <Box direction={"row"} align={"center"} gap={"medium"}>
        <Heading level={4}>{title}</Heading>
      </Box> */}

      <Box height={"1em"} margin={"xxsmall"}>
        {data.status == "loading" && spinning}
      </Box>

      {data.status === "default" ? (
        <Box> </Box>
      ) : data.status === "loading" ? (
        <ResponsiveGrid>
          {emptyData.posts.map((post) => (
            <Box key={post.id} margin={{ right: "small", bottom: "small" }}>
              <SinglePost type={post.type} />
            </Box>
          ))}
        </ResponsiveGrid>
      ) : data.status === "data" ? (
        <ResponsiveGrid>
          {data.posts.map((post) => (
            <Box key={post.id} margin={{ right: "small", bottom: "small" }}>
              <SinglePost
                id={post.id}
                type={post.type}
                src={post.media_url}
                preview={post.preview}
                timestamp={post.createdAt}
              />
            </Box>
          ))}
        </ResponsiveGrid>
      ) : data.status === "error" ? (
        <Box>
          <Text size={"small"} color={"status-error"}>
            {" "}
            {data.message}{" "}
          </Text>
        </Box>
      ) : (
        <Box> </Box>
      )}
    </Box>
  );
};

export default MoleculeMultiplePosts;
