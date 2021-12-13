import React from "react";
import { Box, Text } from "grommet";
import { Folder } from "react-feather";
import { Section, ContentSection } from "./section";
import { isLoggedIn } from "../../service/user-authentication";
import { PlainLink } from "./links";
import { Location } from "@reach/router";

/**
 * @author
 * @function Breadcrumb
 **/

const toTitleCase = (str) => {
  return str.toLowerCase().replace(/(?:^|[\s-/])\w/g, function (match) {
    return match.toUpperCase();
  });
};

const Breadcrumb = ({ location }) => {
  return isLoggedIn() && location && location.pathname.includes("/app") ? (
    <ContentSection>
      <Box
        direction="row-responsive"
        align={"bottom"}
        alignContent={"end"}
        gap={"xxsmall"}
      >
        {location.pathname
          .split("/")
          .slice(1)
          .map((pathItem, index) => {
            if (pathItem === "app") {
              return (
                <Box direction={"row"} align={"center"} gap={"xxsmall"}>
                  <Folder color={"#514E80AA"} size={14} strokeWidth={"2px"} />
                  <Text size={"small"} weight={200} color={"dark-3"}>
                    /
                  </Text>
                </Box>
              );
            } else {
              return (
                <Box direction={"row"} align={"center"} gap={"xxsmall"}>
                  <PlainLink
                    to={location.pathname
                      .split("/")
                      .slice(0, index + 2)
                      .join("/")}
                  >
                    <Text size={"small"} weight={200} color={"dark-1"}>
                      {"  " + pathItem}
                    </Text>
                  </PlainLink>
                  <Text size={"small"} weight={200} color={"dark-3"}>
                    /
                  </Text>
                </Box>
              );
            }
          })}
      </Box>
    </ContentSection>
  ) : (
    <></>
  );
};

export default Breadcrumb;
