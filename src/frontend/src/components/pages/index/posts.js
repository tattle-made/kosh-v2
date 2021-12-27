import { Box, Heading, List, Text } from "grommet";
import React, { useEffect } from "react";
import { get } from "../../../service/backend";
import { ContentSection } from "../../atoms/section";

const PostsIndex = ({ location }) => {
  const [indexStatus, setIndexStatus] = React.useState([]);

  const posts = [
    {id: 'asdf', status: 'failed', image: ''},
    {id: 'asdf1234', status: 'failed', image: ''},
    {id: 'asdf12345678', status: 'failed', image: ''}
  ]

  useEffect(() => {
    postIndexStatus()
  }, [])

  const postIndexStatus = () => {
    const datasourceId = location.state.id
    get(`/index/datasource/${datasourceId}/post`).then((response) => {
      setIndexStatus(response.data)
    }).catch((error) => {
      console.log(error)
    })
  }

  const Preview = ({ type, src, preview }) => {
    return (
      <Box
        width={"medium"}
        height={"medium"}
        border={{ color: type == "error" ? "status-error" : "border" }}
        round={"small"}
        pad={"small"}
      >
        {/* {type == "image" ? (
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
        ) : type == "text" ? ( */}
          <Box pad={"small"} overflow={"hidden"}>
            <Text size={"small"}>{preview}...</Text>
          </Box>
        {/* ) : null} */}
      </Box>
    );
  };

  const ListItem = (post) => {
    return <Box direction={"column"} margin={{ top: "medium" }} gap={"medium"}>
      <Box gap={"medium"}>
        <Preview
          type={post.type}
          src={post.media_url}
          preview={post.preview}
        />
      </Box>
    <pre>{JSON.stringify(post.metadata, undefined, 2)}</pre>
  </Box>
  }

  return (
    <ContentSection>
      <Heading size="small" margin="none">Index</Heading>
      {!indexStatus.length ? <Text size="small" margin="small" color={"dark-3"}>Looks like you haven't gotten started yet!</Text> :
        <List
          pad="small"
          margin={{
            top: "small"
          }}
          primaryKey="name"
          secondaryKey="percent"
          border={false}
          data={posts}
          children={(item) => ListItem(item)}
        />
      }
    </ContentSection>
  );
};

export default PostsIndex;
