import React, { useEffect } from "react";
import { Box, Text, Heading, Paragraph, Image } from "grommet";
import { Home } from "react-feather";
import { useStaticQuery } from "gatsby";
import { BlockSection, ContentSection, Section } from "../atoms/section";
import { ResponsiveGrid } from "../atoms/responsive-grid";
import { PlainLink } from "../atoms/links";
import Breadcrumb from "../atoms/breadcrumbs";
import { graphql } from "gatsby";

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
            {/* <Box direction="column" gap={"xsmall"} margin={{ top: "medium" }}>
              <PlainLink
                to={"/app/datasource/d10879a0-83cd-11eb-8eb1-9d22f3b98bd1"}
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
            </Box> */}
            <Box direction="column" gap={"xsmall"} margin={{ top: "medium" }}>
              <PlainLink
                to={"/app/datasource/d1067dd0-83cd-11eb-8eb1-9d22f3b98bd1"}
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
                    CheckMate: Prioritizing User Generated Content for Fact
                    Checking
                  </Heading>
                  <Paragraph size={"small"} margin={{ top: "none" }}>
                    Dataset of 2200 posts from ShareChat, with annotations by
                    Tattle team of claims contained in them
                  </Paragraph>
                  <a href="https://arxiv.org/abs/2010.13387" taget="_blank">
                    Arxiv Link
                  </a>
                </Box>
              </PlainLink>
            </Box>
            <Box direction="column" gap={"xsmall"} margin={{ top: "medium" }}>
              <PlainLink
                to={"/app/datasource/d1078f40-83cd-11eb-8eb1-9d22f3b98bd1"}
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
                    Data set released by Saha et. al. with their paper: "Short
                    is the Road that Leads from Fear to Hate": Fear Speech in
                    Indian WhatsApp Groups"
                  </Paragraph>
                  <a href="https://arxiv.org/abs/2102.03870" target="_blank">
                    Arxiv Link
                  </a>
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
