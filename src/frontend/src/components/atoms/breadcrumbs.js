import React, { useState, useEffect } from "react";
import { Box, Text } from "grommet";
import { Home } from "react-feather";
import { Section, ContentSection } from "./section";
import { isLoggedIn } from "../../service/user-authentication";

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
  const [fetching, setFetching] = useState(false);
  //const pathItems = location.pathname.split("/").slice(2);
  //const modifiedPathNames = pathItems.map((pathName) => toTitleCase(pathName));

  // console.log({ modifiedPathNames });

  useEffect(() => {
    setFetching(true);
  });

  return (
    isLoggedIn() && (
      <ContentSection>
        <Box direction="row" align={"center"} wrap={true}>
          <Home color={"#514E80AA"} size={32} />
          <Text color={"#514E80AA"} weight={600}>
            {" "}
            &nbsp;\&nbsp;
          </Text>
          <Text size={"large"} weight={600}>
            Datasource
          </Text>
        </Box>
      </ContentSection>
    )
  );
};

export default Breadcrumb;
