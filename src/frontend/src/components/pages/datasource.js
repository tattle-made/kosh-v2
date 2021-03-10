import React, { useEffect } from "react";
import { Box, Heading, Text } from "grommet";
import { BlockSection, ContentSection, Section } from "../atoms/section";
import DataFeed from "../atoms/DataFeed";

const datasourceToCollectionMap = {
  "7c62d659-8294-11eb-bd02-0242ac120004": "Fact Check Article Media Items",
  "bc55e2a0-8228-11eb-9e87-719e13e27321": "Checkmate dataset",
  "bc58a1c0-8228-11eb-9e87-719e13e27321": "The Fearspeech Dataset",
};

const Datasource = ({ datasourceId }) => {
  return (
    <ContentSection>
      <Box direction={"column"}>
        <Section>
          <Box height={"3.6em"}></Box>
          <Text size={"large"}>{datasourceToCollectionMap[datasourceId]}</Text>
          <DataFeed
            title={datasourceToCollectionMap[datasourceId]}
            datasourceId={datasourceId}
          />
        </Section>
      </Box>
    </ContentSection>
  );
};

export default Datasource;
