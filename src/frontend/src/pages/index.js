import React from "react";
import { Box, Text, Heading } from "grommet";
import { ContentSection } from "../components/atoms/section";
import Layout from "../layouts";

const Index = () => {
  return (
    <Layout>
      <ContentSection>
        <Heading level={2}>Lets archive the important stuff</Heading>
      </ContentSection>
    </Layout>
  );
};

export default Index;
