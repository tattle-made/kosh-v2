import React, { useState, useEffect } from "react";
import { Box, Text } from "grommet";
import { Slack, GitHub, Twitter } from "react-feather";
import { PlainExternalLink, PlainLink } from "./links";
import { ContentSection } from "./section";
import { isLoggedIn } from "../../service/user-authentication";

const Footer = () => {
  return (
    !isLoggedIn() && (
      <ContentSection>
        <Box direction={"row"} wrap={true}>
          <Box direction={"row"} gap={"medium"}>
            <PlainLink to={"/privacy-policy"}>
              <Text size={"small"}>Privacy Policy</Text>
            </PlainLink>
            <PlainLink to={"/terms-of-service"}>
              <Text size={"small"}>Terms of Service</Text>
            </PlainLink>
          </Box>
          <Box flex={"grow"}></Box>
          <Box direction={"row"} gap={"small"}>
            <PlainExternalLink
              href={"https://admin417477.typeform.com/to/nVuNyG"}
              target={"_blank"}
            >
              <Slack size={12} />
            </PlainExternalLink>
            <PlainExternalLink
              href={"https://github.com/tattle-made"}
              target={"_blank"}
            >
              <GitHub size={12} />
            </PlainExternalLink>
            <PlainExternalLink
              href={"https://twitter.com/tattlemade"}
              target={"_blank"}
            >
              <Twitter size={12} />
            </PlainExternalLink>
          </Box>
        </Box>
      </ContentSection>
    )
  );
};

export default Footer;
