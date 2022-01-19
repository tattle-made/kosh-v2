import { Box, Button } from "grommet";
import React, { useEffect } from "react";
import Dropzone from "react-dropzone";
import { Filter, Upload, X } from "react-feather";
import { get, postWithToken } from "../../service/backend";
import {
  post as postToIndexApi,
  postFormData as postFormDataToIndexApi,
} from "../../service/indexer-api";
import Preview from "../atoms/post-preview";
import SearchBox from "../atoms/search-box";
import SearchSettings from "../atoms/search-settings";
import theme from "../atoms/theme";

const SearchPost = () => {
  const [searchString, setSearchString] = React.useState("");
  const [showFilter, setShowFilter] = React.useState(false);
  const [selectedTypes, setSelectedTypes] = React.useState([]);
  const [selectedDatasource, setSelectedDatasource] = React.useState([]);
  const [fromDate, setFromDate] = React.useState();
  const [toDate, setToDate] = React.useState();
  const [searchFile, setSearchFile] = React.useState();
  const [posts, setPosts] = React.useState([]);
  const [datasources, setDatasources] = React.useState([]);
  const [queryInput, showQueryInput] = React.useState(false);

  const grayColor = theme.global.colors["light-1"];

  useEffect(() => {
    get("/datasource")
      .then((response) => {
        setDatasources(response.data);
      })
      .catch((res) => console.log(res));
  }, []);

  const onDrop = (acceptedFiles) => {
    setSearchFile(acceptedFiles[0]);
    const formData = new FormData();
    const blob = new Blob([JSON.stringify({ query_type: "image" })], {
      type: "application/json",
    });
    formData.append("data", blob);
    formData.append("media", acceptedFiles[0]);
    postFormDataToIndexApi("/search", formData)
      .then((response) => {
        if (!response.data.matches || !response.data.matches.length) return;
        getPosts(response.data.matches);
      })
      .catch((res) => console.log(res));
  };

  const getPosts = (searchResult) => {
    const postIds = searchResult.map((post) => post.e_kosh_id);
    postWithToken("/posts", { postIds })
      .then((response) => setPosts(response.data))
      .catch((e) => console.log(e));
  };

  const searchWithText = () => {
    const payload = {};
    if (selectedTypes.length) payload.type = selectedTypes;
    if (selectedDatasource.length) payload.type = selectedDatasource;
    if (queryInput) {
      payload.query = searchString;
      payload.query_type = "raw_query";
    } else {
      payload.text = searchString;
      payload.query_type = "text";
    }
    postToIndexApi("/search", JSON.stringify(payload))
      .then((response) => {
        if (!response.data.matches || !response.data.matches.length) return;
        getPosts(response.data.matches);
      })
      .catch((res) => console.log(res));
  };

  return (
    <>
      {showFilter ? (
        <SearchSettings
          selectedDatasource={selectedDatasource}
          setSelectedDatasource={setSelectedDatasource}
          datasources={datasources}
          selectedTypes={selectedTypes}
          setSelectedTypes={setSelectedTypes}
          fromDate={fromDate}
          setFromDate={setFromDate}
          toDate={toDate}
          setToDate={setToDate}
          setShowFilter={setShowFilter}
        />
      ) : (
        <>
          <Box pad={"small"} direction="row" width={"large"}>
            <Box justify="center" align="center" width={"xxsmall"}>
              <Dropzone onDrop={onDrop}>
                {({ getRootProps, getInputProps }) => {
                  return (
                    <Box {...getRootProps()}>
                      <input {...getInputProps()} />
                      <Upload color={grayColor} />
                    </Box>
                  );
                }}
              </Dropzone>
            </Box>
            {searchFile ? (
              <Box
                width={"large"}
                pad={"small"}
                direction="row"
                justify="between"
                border="all"
                align="center"
                round="small"
              >
                {searchFile.name}
                <Button onClick={() => setSearchFile(null)}>
                  <X color={"#514E80AA"} size={26} />
                </Button>
              </Box>
            ) : (
              <SearchBox
                setSearchString={setSearchString}
                searchString={searchString}
                search={searchWithText}
                queryInput={queryInput}
                showQueryInput={showQueryInput}
              />
            )}
            <Box
              pad={"small"}
              justify={"center"}
              round={"xsmall"}
              focusIndicator={false}
              onClick={() => setShowFilter(true)}
            >
              <Filter color={"#514E80AA"} size={22} />
            </Box>
          </Box>
          <Box direction="row" gap="small" pad={"small"} wrap={true}>
            {posts.map((post) => (
              <Preview
                id={post.id}
                datasource={post.datasource}
                type={post.type}
                src={post.media_url}
                preview={post.preview}
              />
            ))}
          </Box>
        </>
      )}
    </>
  );
};

export default SearchPost;
