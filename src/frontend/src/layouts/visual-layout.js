import React, { useState, useContext } from "react";
import { Box, Text, Layer, Button } from "grommet";
import SEO from "../components/atoms/seo";
import Header from "../components/atoms/header";
import { ContentSection, BlockSection } from "../components/atoms/section";
import Footer from "../components/atoms/footer";
import { X } from "react-feather";
import { NotificationContext } from "../components/atoms/context";
import Breadcrumb from "../components/atoms/breadcrumbs";

const VisualLayout = ({ children, location }) => {
  const { notification, setNotification } = useContext(NotificationContext);

  const onCloseNotification = () => {
    setNotification({ visibility: false, message: "" });
  };

  return (
    <Box file direction={"column"} fill>
      <SEO title={`Kosh`} />

      <Header />
      <Breadcrumb location={location} />

      <Box flex={"grow"}>
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
      </Box>

      <Footer />
    </Box>
  );
};

export default VisualLayout;
