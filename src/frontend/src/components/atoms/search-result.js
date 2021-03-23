import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import { ResponsiveContext, Heading, Box, Text } from "grommet";
import DataTable from "react-data-table-component";
import SinglePost from "../../components/atoms/single-post";
import { DateTime } from "luxon";
import { SearchContext } from "./context";

const StyledDataTable = styled(DataTable)`
  .rdt_table : {
    font-size: 2em;
  }
`;

function ExpandedSinglePost({ data }) {
  return (
    <Box width={"100vw"} overflow={"auto"}>
      <pre>{JSON.stringify(data, undefined, 2)}</pre>
    </Box>
  );
}

const SearchResult = ({ data, query }) => {
  const size = useContext(ResponsiveContext);
  const { search, setSearch } = useContext(SearchContext);

  useEffect(() => {
    if (search.visibility === false && search.payload != undefined) {
      if (search.payload.searchString != undefined) {
        console.log("searching text ", search);
      } else if (search.payload.acceptedFiles != undefined) {
        console.log("searching image ", search);
      }
    }
    // return () => {
    //   //cleanup
    // };
  }, [search]);

  useEffect(() => {
    console.log({ query });
    return () => {
      // cleanup
    };
  }, [query]);

  const columns = [
    {
      name: "Preview",
      selector: "media_url",
      cell: (row) => (
        <Box width={"xsmall"} height={"xsmall"} margin={"small"}>
          <SinglePost
            id={row.id}
            type={row.type}
            src={row.media_url}
            preview={row.preview}
            timestamp={row.createdAt}
          />
        </Box>
      ),
    },
    {
      name: "Type",
      selector: "type",
      sortable: true,
      hide: "sm",
    },
    {
      name: "Published At",
      selector: "published_at",
      sortable: true,
      cell: (row) => (
        <p>
          {DateTime.fromISO(row.published_at)
            .setZone("Asia/Kolkata")
            .toLocaleString(DateTime.DATE_MED)}
        </p>
      ),
    },
  ];

  const handleChange = (state) => {
    // You can use setState or dispatch with something like Redux so we can use the retrieved data
    console.log("Selected Rows: ", state.selectedRows);
  };

  return (
    <ResponsiveContext.Consumer>
      {(size) => (
        <Box label={"Search Results"} flex={"grow"}>
          <Heading level={2} size={"small"}>
            Results
          </Heading>
          <StyledDataTable
            columns={columns}
            data={data}
            responsive={false}
            expandableRows
            expandableRowsComponent={<ExpandedSinglePost />}
            noHeader
            selectableRows
            Selected={handleChange}
            title={size}
          />
        </Box>
      )}
    </ResponsiveContext.Consumer>
  );
};

export default SearchResult;
