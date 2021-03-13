import React from "react";
import { Box, Text } from "grommet";
import { Home } from "react-feather";
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
  console.log({ brec: location });

  return isLoggedIn() && location && location.pathname.includes("/app") ? (
    <ContentSection>
      <Box direction="row" align={"center"} wrap={true}>
        <Home color={"#514E80AA"} size={32} />
        <Text color={"#514E80AA"} weight={600}>
          {" "}
          &nbsp;\&nbsp;
        </Text>
        <PlainLink to="/app/datasource">
          <Text size={"medium"} weight={600}>
            Datasources
          </Text>
        </PlainLink>
      </Box>
    </ContentSection>
  ) : (
    <></>
  );
};

export default Breadcrumb;
