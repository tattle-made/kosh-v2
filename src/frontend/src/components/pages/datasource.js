import React, { useEffect } from "react";
import { Box, Heading, Text } from "grommet";
import { BlockSection, ContentSection, Section } from "../atoms/section";
import DataFeed from "../atoms/datafeed";

const datasourceToCollectionMap = {
  "627b83e2-03b3-449c-a2bf-72d8a664ba93": "Fact Check Article Media Items",
  "47f0b9c4-2620-4703-8840-ca4ead210f54": "Election Memes from Whatsapp",
  "38db9b46-ad43-4370-a1ba-05a25f4756f2": "The Fearspeech Dataset",
};

const Datasource = ({ datasourceId }) => {
  return (
    <ContentSection>
      <Box direction={"column"}>
        <Section>
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
