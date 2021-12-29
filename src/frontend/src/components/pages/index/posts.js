import { Box, Button, CheckBox, Heading, Image, List, Text, Video } from "grommet";
import React, { useEffect } from "react";
import { get, patch, post, postWithToken } from "../../../service/backend";
import { ContentSection } from "../../atoms/section";

const PostsIndex = ({ location }) => {
  const [posts, setPosts] = React.useState([]);
  const [failedStatus, setFailedStatus] = React.useState(false);
  const [blacklistedStatus, setBlacklistedStatus] = React.useState(false);
  const [filteredPosts, setFilteredPosts] = React.useState([]);
  const datasourceId = location.state.id
  
  useEffect(() => {
    postIndexStatus()
  }, [])

  useEffect(() => {
    filterPosts()
  }, [failedStatus, blacklistedStatus])

  const postIndexStatus = () => {
    get(`/index/datasource/${datasourceId}/post`).then((response) => {
      response.data.forEach((post) => post.checked = false)
      setPosts(response.data)
      setFilteredPosts(response.data)
    }).catch((error) => {
      console.log(error)
    })
  }

  const filterPosts = () => {
    const filter = []
    if (failedStatus) filter.push('failed')
    if (blacklistedStatus) filter.push('blacklisted')
    if (!filter.length) return setFilteredPosts(posts)
    return setFilteredPosts(posts.filter((post) => filter.includes(post.index_status)))
  }

  const retryIndex = () => {
    const postIds = filteredPosts.filter((post) => post.checked).map((post) => post.id)
    postWithToken(`/index/datasource/${datasourceId}/post`, {postIds}).then((response) => {
    }).catch((error) => {
      console.log(error)
    })
  }

  const blacklistIndex = () => {
    const postIds = filteredPosts.filter((post) => post.checked).map((post) => post.id)
    patch(`/index/datasource/${datasourceId}/post/blacklist`, {postIds}).then((response) => {
      postIndexStatus()
    }).catch((error) => {
      console.log(error)
    })
  }

  const selectPost = (index) => {
    const post = filteredPosts[index];
    post.checked = !post.checked
    setFilteredPosts([...filteredPosts])
  }

  const Preview = ({ type, src, preview }) => {
    return (
      <Box
        border={{ color: type == "error" ? "status-error" : "border" }}
        round={"small"}
        pad={"small"}
      >
        <Box width={"medium"} height={"xsmall"} overflow={"hidden"}>
          {type == "image" ? (
              <Image alt="Post Image" fit="contain" src={src}/>
          ) : type == "video" ? (
              <Video controls="over" fit="contain" >
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

  const ListItem = (post, i) => {
    return <Box direction={"row"} margin={{ top: "medium" }} gap={"small"} hoverIndicator={true}>
      <CheckBox
        a11yTitle="Select Post"
        checked={post.checked}
        onChange={() => selectPost(i)}
      />
      <Preview
        type={post.type}
        src={post.media_url}
        preview={post.preview}
      />
      <Box pad={"small"} overflow={"hidden"} width={"medium"}>
        <Text wordBreak={"break-all"} size={"xsmall"}>{post.id}</Text>
        {post.index_status ? (
          <Box margin={{top: "medium"}} pad="small" background="visuals-1" style={{width: "fit-content", textTransform: "capitalize"}}>
            <Text size={"small"}>{post.index_status}</Text>
          </Box>
        ) : (null)}
      </Box>
    </Box>
  }

  return (
    <ContentSection>
      {/* <Heading size="small" margin="none">Index / {location}</Heading> */}
      {!posts.length ? <Text size="small" margin="small" color={"dark-3"}>No Posts Found!</Text> :
        <>
          <Box direction="row" gap="small" justify="evenly">
            <Button
                active={true}
                label="Retry"
                color={'neutral-2'}
                margin={"small"}
                style={{border: "1px solid #e0e0e0"}}
                onClick={retryIndex}
                size="small"
                fill="horizontal"
              ></Button>
              <Button
                active={true}
                label="Blacklist"
                color={'brand'}
                margin={"small"}
                hoverIndicator
                fill="horizontal"
                style={{border: "1px solid #e0e0e0"}}
                onClick={blacklistIndex}
                size="small" />
          </Box>
          <Box margin="medium" direction="row" gap="small">
            <Text size="small" weight="bold">Filter: </Text>
            <CheckBox checked={failedStatus}
              label={"Failed"}
              onChange={() => setFailedStatus(!failedStatus)}/>
            <CheckBox checked={blacklistedStatus}
              label={"Blacklisted"}
              onChange={() => setBlacklistedStatus(!blacklistedStatus)}/>
          </Box>
          <List
            pad="small"
            border={false}
            data={filteredPosts}
            children={(item, i) => ListItem({...item}, i)}
          />
        </>
      }
    </ContentSection>
  );
};

export default PostsIndex;
