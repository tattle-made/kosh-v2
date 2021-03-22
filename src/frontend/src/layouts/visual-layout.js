import React, { useState, useContext, useRef } from "react";
import { Box, Text, Layer, Button, Card } from "grommet";
import SEO from "../components/atoms/seo";
import Header from "../components/atoms/header";
import { ContentSection, BlockSection } from "../components/atoms/section";
import Footer from "../components/atoms/footer";
import { X } from "react-feather";
import {
  NotificationContext,
  SearchContext,
} from "../components/atoms/context";
import Breadcrumb from "../components/atoms/breadcrumbs";
import { SearchInputExpanded } from "../components/atoms/search-input";

const VisualLayout = ({ children, location }) => {
  const { notification, setNotification } = useContext(NotificationContext);
  const { search, setSearch } = useContext(SearchContext);
  const headerRef = useRef();

  const onCloseNotification = () => {
    setNotification({ visibility: false, message: "" });
  };

  const onCloseSearch = () => {
    console.log("hilowss");
    setSearch({ visibility: false, payload: {} });
  };

  return (
    <Box fill direction={"column"}>
      <SEO title={`Kosh`} />

      <Box>
        <Header />
        <Breadcrumb location={location} />
      </Box>

      <Box fill>
        <Box>{children}</Box>
        {notification.visibility && (
          <Layer
            position="bottom-left"
            onClickOutside={onCloseNotification}
            onEsc={onCloseNotification}
            animate={false}
            margin={"medium"}
            background={"none"}
            plain={true}
          >
            <BlockSection>
              <Box
                background={"neutral-3"}
                round={"xxsmall"}
                pad={"xsmall"}
                direction={"row"}
                alignContent={"center"}
              >
                <Box flex={"grow"}>
                  <Text color={"status-error"} size={"small"}>
                    {notification.message}
                  </Text>
                </Box>
              </Box>
            </BlockSection>
          </Layer>
        )}
        {search.visibility && (
          <Layer
            animate={false}
            plain={true}
            onEsc={onCloseSearch}
            onClickOutside={onCloseSearch}
            position={"top-right"}
            margin={"medium"}
            modal={true}
          >
            <SearchInputExpanded />
          </Layer>
        )}
      </Box>

      <Footer />
    </Box>
  );
};

export default VisualLayout;
