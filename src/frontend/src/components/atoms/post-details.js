import React, { useEffect, useState } from "react";
import { Box, Heading, Text, Image, Video, Button } from "grommet";
import { BlockSection, ContentSection, Section } from "../atoms/section";
import { getUser } from "../../service/user-authentication";
import axios from "axios";
import ReactJson from "react-json-view";
import { PlainExternalLink } from "./links";
import { ArrowDown } from "react-feather";

const PostDetails = ({ datasourceId, postId }) => {
  const user = getUser();
  const { accessToken } = user;
  const [detail, setDetails] = useState({});

  useEffect(() => {
    console.log({ datasourceId, postId });
    axios
      .get(
        `http://localhost:10001/datasource/${datasourceId}/posts/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setDetails(response.data);
        // setPageCount(response.data.posts.totalPages);
        // setMultipleMediaBlockData({
        //   status: "data",
        //   posts: response.data.posts.posts,
        // });
      })
      .catch((err) => {
        // setMultipleMediaBlockData({ status: "error" });
        console.log("Error : could not load data");
      });
  }, [postId]);

  return (
    <ContentSection>
      <Box direction={"column"}>
        <Section>
          <Box direction={"row-responsive"} gap={"medium"} align={"baseline"}>
            <Text size={"large"}>Post Detail</Text>
            <Box
              round={"small"}
              pad={"xsmall"}
              alignContent={"center"}
              width={"fit-content"}
            >
              <PlainExternalLink
                href={detail.post ? detail.post.media_url : ""}
                target={"_blank"}
              >
                <ArrowDown />
              </PlainExternalLink>
            </Box>
          </Box>

          <Box
            direction={"row-responsive"}
            margin={{ top: "medium" }}
            gap={"medium"}
          >
            {detail && detail.post && (
              <Box gap={"medium"}>
                <Preview
                  type={detail.post.type}
                  src={detail.post.media_url}
                  preview={detail.post.preview}
                />
              </Box>
            )}

            <ReactJson
              name={"metadata"}
              src={detail.metadata}
              enableClipboard={false}
              displayDataTypes={false}
            />
          </Box>
        </Section>
      </Box>
    </ContentSection>
  );
};

const Preview = ({ type, src, preview }) => {
  return (
    <Box
      width={"medium"}
      height={"medium"}
      border={{ color: type == "error" ? "status-error" : "border" }}
      round={"small"}
      pad={"small"}
    >
      {type == "image" ? (
        <Image fit="contain" src={src} />
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
        <Box pad={"small"} overflow={"hidden"}>
          <Text size={"small"}>{preview}...</Text>
        </Box>
      ) : null}
    </Box>
  );
};

export default PostDetails;
