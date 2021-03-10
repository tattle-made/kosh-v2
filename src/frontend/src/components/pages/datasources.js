import React, { useEffect } from "react";
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

const DataSources = ({ location }) => {
  const {
    cover_factcheck_articles,
    cover_fear_speech,
    cover_checkmate,
  } = useStaticQuery(graphql`
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
      cover_fear_speech: file(relativePath: { eq: "fear_speech_cover.png" }) {
        childImageSharp {
          fluid {
            src
          }
        }
      }
      cover_checkmate: file(relativePath: { eq: "checkmate_cover.png" }) {
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
          <Text size={"large"}>Datasources</Text>
          <ResponsiveGrid>
            <Box direction="column" gap={"xsmall"} margin={{ top: "medium" }}>
              <PlainLink
                to={"/app/datasource/7c62d659-8294-11eb-bd02-0242ac120004"}
              >
                <Box
                  width={"100%"}
                  height={"small"}
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
            <Box direction="column" gap={"xsmall"} margin={{ top: "medium" }}>
              <PlainLink
                to={"/app/datasource/bc55e2a0-8228-11eb-9e87-719e13e27321"}
              >
                <Box
                  width={"100%"}
                  height={"small"}
                  round={"xxsmall"}
                  overflow={"hidden"}
                  background={`visuals-1`}
                >
                  <Image
                    src={cover_checkmate.childImageSharp.fluid.src}
                    fit="contain"
                    fill={true}
                  />
                </Box>
                <Box>
                  <Heading
                    level={4}
                    margin={{ bottom: "4.578px", top: "7.324px" }}
                  >
                    Checkmate dataset
                  </Heading>
                  <Paragraph size={"small"} margin={{ top: "none" }}>
                    Sed eu dui in lorem auctor faucibus. Sed ac felis nec lectus
                    eleifend ultrices.
                  </Paragraph>
                </Box>
              </PlainLink>
            </Box>
            <Box direction="column" gap={"xsmall"} margin={{ top: "medium" }}>
              <PlainLink
                to={"/app/datasource/bc58a1c0-8228-11eb-9e87-719e13e27321"}
              >
                <Box
                  width={"100%"}
                  height={"small"}
                  round={"xxsmall"}
                  overflow={"hidden"}
                  background={`visuals-2`}
                  pad={"large"}
                >
                  <Image
                    src={cover_fear_speech.childImageSharp.fluid.src}
                    fit="contain"
                  />
                </Box>
                <Box>
                  <Heading
                    level={4}
                    margin={{ bottom: "4.578px", top: "7.324px" }}
                  >
                    Fearspeech Dataset
                  </Heading>
                  <Paragraph size={"small"} margin={{ top: "none" }}>
                    Etiam porta tempus lectus, sed auctor erat venenatis
                    vestibulum. Nulla sit amet maximus enim. Pellentesque in sem
                    hendrerit, volutpat est at, bibendum massa. Nunc eu
                    vulputate orci.
                  </Paragraph>
                </Box>
              </PlainLink>
            </Box>
            <Box
              direction="column"
              gap={"xsmall"}
              margin={{ top: "medium" }}
              border={{ color: "light-3" }}
              round={"xsmall"}
              pad={"small"}
              height={"fit-content"}
            >
              <Paragraph size={"small"} margin={{ top: "none" }}>
                We're constantly adding and hosting new datasources on Kosh.
                Email us on admin@tattle.co.in if you have a datasource to
                share.
              </Paragraph>
            </Box>
          </ResponsiveGrid>
        </Section>
      </Box>
    </ContentSection>
  );
};

export default DataSources;
