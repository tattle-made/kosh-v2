import { Box, Image, Text, Video } from "grommet";
import React from "react";
import { navigate } from "gatsby";

const Preview = ({ type, src, preview, id, datasource }) => {
  const previewClicked = (e) => {
    console.log({ id, datasource });
    navigate(`/app/datasource/${datasource}/${id}`);
  };
  return (
    <Box
      border={{ color: type == "error" ? "status-error" : "border" }}
      width={"small"}
      height={"small"}
      round={"small"}
      pad={"small"}
      margin={"small"}
      onClick={previewClicked}
    >
      <Box height={"xsmall"} overflow={"hidden"} fill={true}>
        {type == "image" ? (
          <Image alt="Post Image" fit="contain" src={src} />
        ) : type == "video" ? (
          <Video controls="over" fit="contain">
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
          <Text size={"xsmall"}>{preview}...</Text>
        ) : null}
      </Box>
    </Box>
  );
};

export default Preview;
