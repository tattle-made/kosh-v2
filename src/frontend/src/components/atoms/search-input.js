import React, { useRef, useContext } from "react";
import { Box, Text, Button, Card, TextInput, Keyboard } from "grommet";
import { Search } from "react-feather";
import theme from "./theme";
import styled from "styled-components";
import { Upload } from "react-feather";

import Dropzone from "react-dropzone";
import { SearchContext } from "./context";
import { PlainLink } from "./links";
const InvisibleFileUploadButton = styled.input`
  background: red;
  display: none;
`;

const brandColor = theme.global.colors.brand;
const secondaryColor = theme.global.colors["accent-1"];
const grayColor = theme.global.colors["light-1"];

const SearchInput = () => {
  const { search, setSearch } = useContext(SearchContext);

  function expandSearchInput() {
    setSearch({ visibility: true, payload: {} });
  }

  return (
    <Box direction={"row"} align={"center"}>
      <Button
        icon={<Search color={brandColor} />}
        onClick={expandSearchInput}
        plain
        focusIndicator={false}
      />
    </Box>
  );
};

const SearchInputExpanded = () => {
  const fileUploader = useRef(null);
  const [searchString, setSearchString] = React.useState("");

  const onDrop = (acceptedFiles) => {
    console.log("==files==");
    console.log(acceptedFiles);
  };

  const onSearchQueryEntered = () => {};

  return (
    <Card background={"light-1"}>
      <Box pad={"small"} width={"medium"}>
        <Box gap={"small"}>
          <Dropzone onDrop={onDrop}>
            {({ getRootProps, getInputProps }) => (
              <Box>
                <Box {...getRootProps()}>
                  <input {...getInputProps()} />
                  <Box
                    border={{
                      color: grayColor,
                      size: "xsmall",
                    }}
                    pad={"small"}
                    align={"center"}
                    round={"xsmall"}
                  >
                    <Upload color={grayColor} />
                  </Box>
                </Box>
              </Box>
            )}
          </Dropzone>
          <Box alignSelf={"center"}>
            <Text size={"small"} color={"dark-4"}>
              or
            </Text>
          </Box>
          <Keyboard onEnter={() => console.log("Enter Pressed")}>
            <TextInput
              placeholder="Search"
              value={searchString}
              onChange={(event) => setSearchString(event.target.value)}
            />
          </Keyboard>
        </Box>
        <Box height={"1em"} />
        <Box align={"end"}>
          <PlainLink to={"/search-tips"}>
            <Text size={"xsmall"}> Search tips</Text>
          </PlainLink>
        </Box>
        {/* <Button secondary label={"Search"} focusIndicator={false} /> */}
      </Box>
    </Card>
  );
};

export { SearchInput, SearchInputExpanded };
