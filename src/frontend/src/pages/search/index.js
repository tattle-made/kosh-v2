import React from "react";
import { Heading, Box } from "grommet";
import Layout from "../../layouts";
import { ContentSection } from "../../components/atoms/section";

export default function Index({ location }) {
  return (
    <Layout location={location}>
      <ContentSection>
        <Box>
          <Heading>Search</Heading>
        </Box>
      </ContentSection>
    </Layout>
  );
}
