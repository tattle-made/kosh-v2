import React from "react";
import { Box, Text, Heading, Paragraph, Image } from "grommet";
import { Home } from "react-feather";
import { useStaticQuery } from "gatsby";
import { BlockSection, ContentSection, Section } from "../atoms/section";
import { ResponsiveGrid } from "../atoms/responsive-grid";
import { PlainLink } from "../atoms/links";
import Breadcrumb from "../atoms/breadcrumbs";

/**
 * @author
 * @function Datasources
 **/

const DataSource = ({ location }) => {
  const { cover_factcheck_articles } = useStaticQuery(graphql`
    query {
      cover_factcheck_articles: file(
        relativePath: { eq: "fact_check_cover.png" }
      ) {
        childImageSharp {
          fluid {
            src
          }
        }
      }
    }
  `);
  return (
    <ContentSection>
      <Box direction={"column"}>
        <Section>
          <ResponsiveGrid>
            <Box direction="column" gap={"xsmall"} margin={{ top: "medium" }}>
              <PlainLink to={"/app/datasource/factcheck-articles"}>
                <Box
                  width={"100%"}
                  height={"160px"}
                  round={"xxsmall"}
                  overflow={"hidden"}
                  background={`visuals-1`}
                >
                  <Image
                    src={cover_factcheck_articles.childImageSharp.fluid.src}
                    fit="contain"
                    fill={true}
                  />
                </Box>
                <Box>
                  <Heading
                    level={4}
                    margin={{ bottom: "4.578px", top: "7.324px" }}
                  >
                    Fact Check Articles
                  </Heading>
                  <Paragraph size={"small"} margin={{ top: "none" }}>
                    These media items were scraped between 2018 to 2020 from
                    IFCN certified Indian Fact Checking agencies
                  </Paragraph>
                </Box>
              </PlainLink>
            </Box>
          </ResponsiveGrid>
        </Section>
      </Box>
    </ContentSection>
  );
};

export default DataSource;
