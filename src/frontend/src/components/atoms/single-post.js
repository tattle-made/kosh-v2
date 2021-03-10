import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Image,
  Video,
  Heading,
  Text,
  ResponsiveContext,
} from "grommet";
import { Edit, Maximize2 } from "react-feather";
import styled from "styled-components";
import Moment from "moment";
import { navigate } from "gatsby";
import { useLocation } from "@reach/router";

/**
 * @author
 * @function Single
 **/

// const TagLabel = styled(Text)`
//     line-height: 2.2em
// `

const boxDimension = {
  medium: "12em",
  small: "8em",
  large: "18em",
};

const SinglePost = ({ id, type, src, preview, heading, body, timestamp }) => {
  const [fetching, setFetching] = useState(false);
  const [hover, setHover] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setFetching(true);
  });

  const postClicked = () => {
    console.log("clicked", id);
    console.log(location);
    navigate(`${location.pathname}/post/${id}`);
  };

  const onMouseEnter = () => setHover(true);
  const onMouseLeave = () => setHover(false);

  return (
    <ResponsiveContext.Consumer>
      {(size) => (
        <Box
          width={boxDimension[size]}
          border={{ color: type == "error" ? "status-error" : "light-3" }}
          round={"xsmall"}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          overflow={"hidden"}
          onClick={postClicked}
        >
          <Box
            width={boxDimension[size]}
            height={boxDimension[size]}
            pad={"small"}
            alignContent={"center"}
          >
            {type == "image" ? (
              <Image fit="contain" src={src} />
            ) : type == "video" ? (
              <Video controls="over" fit="cover">
                <source key="video" src={src} type="video/mp4" />
                <track
                  key="cc"
                  label="English"
                  kind="subtitles"
                  srcLang="en"
                  src="/assets/small-en.vtt"
                  default
                />
              </Video>
            ) : type == "text" ? (
              <Box pad={"small"} overflow={"hidden"}>
                <Text size={"xsmall"}>{preview}...</Text>
              </Box>
            ) : null}
          </Box>

          {/*type != "error" && (
            <Box pad={"small"}>
              <Text size={"medium"}> {heading} </Text>
              <Text size={"small"}> {body} </Text>
              {timestamp ? (
                <Text size={"xsmall"}> {Moment(timestamp).format("lll")} </Text>
              ) : (
                <Text size={"xsmall"}> ... </Text>
              )}
            </Box>
              )*/}
        </Box>
      )}
    </ResponsiveContext.Consumer>
  );
};

export default SinglePost;
