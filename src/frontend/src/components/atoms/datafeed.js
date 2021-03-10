import React, { useState, useEffect } from "react";
import { ResponsiveContext, Box, Text, Button } from "grommet";
import { useLocation } from "@reach/router";
import { parse } from "query-string";
import { getUser } from "../../service/user-authentication";
import axios from "axios";
// import DataAccess from "./DataAccess";
import MoleculeMultiplePosts from "./molecule-multiple-posts";
import { ArrowLeft, ArrowRight } from "react-feather";
import DataFeedControls from "./data-feed-controls";

/**
 * @author
 * @function DataFeed
 **/

const DataFeed = ({ title, datasourceId }) => {
  console.log({ woah_2: title });
  const location = useLocation();
  const searchParams = parse(location.search);
  const page = searchParams.page ? searchParams.page : 1;
  const user = getUser();
  const { accessToken } = user;

  const [pageCount, setPageCount] = useState(0);
  const [fetching, setFetching] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [mediaType, setMediaType] = useState("all");
  const [multipleMediaBlockData, setMultipleMediaBlockData] = useState({
    status: "default",
  });
  const [filterValue, setFilterValue] = React.useState("all");

  const screenSize = React.useContext(ResponsiveContext);
  console.log("--screensize--", screenSize);

  const increment = () => {
    if (pageNumber != pageCount) {
      setPageNumber(pageNumber + 1);
      getData(filterValue, pageNumber);
    }
  };

  const decrement = () => {
    if (pageNumber != 1) {
      setPageNumber(pageNumber - 1);
      getData(filterValue, pageNumber);
    }
  };

  const getData = (type, pageNum) => {
    setMultipleMediaBlockData({ status: "loading" });
    return axios
      .get(
        `http://localhost:10001/datasource/${datasourceId}/posts?page=${pageNum}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data.posts);
        setPageCount(response.data.posts.totalPages);
        setMultipleMediaBlockData({
          status: "data",
          posts: response.data.posts.posts,
        });
      })
      .catch((err) => {
        setMultipleMediaBlockData({ status: "error" });
      });
  };

  useEffect(() => {
    setFetching(true);
    getData(filterValue, 1);
  }, []);

  const onFilterChange = (filterValue) => {
    setFilterValue(filterValue);
    getData(filterValue, pageNumber);
  };

  return (
    <Box fill>
      {/*screenSize === "small" ? (
        <Box
          direction={"column"}
          fill={"horizontal"}
          margin={{ top: "large" }}
          gap={"medium"}
          flex={false}
        >
          <DataFeedControls label={title} onChange={onFilterChange} />
          { <DataAccess /> }
        </Box>
      ) : (
        <Box
          direction={"row"}
          fill={"horizontal"}
          margin={{ top: "large" }}
          wrap={"true"}
          flex={false}
        >
          <DataFeedControls onChange={onFilterChange} />
          {<DataAccess /> }
        </Box>
      )*/}

      <Box
        fill={"horizontal"}
        margin={{ top: "medium" }}
        direction={"row"}
        gap={"small"}
        align={"center"}
      >
        <Button
          plain
          margin={"none"}
          onClick={decrement}
          focusIndicator={false}
        >
          <ArrowLeft size={16} />
        </Button>
        <Text size={"small"}>
          {" "}
          showing page {pageNumber} of {pageCount}{" "}
        </Text>
        <Button
          plain
          margin={"none"}
          onClick={increment}
          focusIndicator={false}
        >
          <ArrowRight size={16} />
        </Button>
      </Box>

      <Box>
        <MoleculeMultiplePosts data={multipleMediaBlockData} />
      </Box>
    </Box>
  );
};

export default DataFeed;
