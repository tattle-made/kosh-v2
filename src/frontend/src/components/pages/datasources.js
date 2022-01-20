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
          <ResponsiveGrid>
            <Box direction="column" gap={"xsmall"} margin={{ top: "medium" }}>
              <PlainLink
                to={"/app/datasource/627b83e2-03b3-449c-a2bf-72d8a664ba93"}
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
                to={"/app/datasource/47f0b9c4-2620-4703-8840-ca4ead210f54"}
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
                    Whatsapp Election Memes
                  </Heading>
                  <Paragraph size={"small"} margin={{ top: "none" }}>
                    A Dataset of Fact-Checked Images Shared on WhatsApp during
                    the Brazilian and Indian Elections
                  </Paragraph>
                  <a
                    href="https://zenodo.org/record/3779157#.YeYdEfvhVhE"
                    taget="_blank"
                  >
                    Zenodo Link
                  </a>
                </Box>
              </PlainLink>
            </Box>
            <Box direction="column" gap={"xsmall"} margin={{ top: "medium" }}>
              <PlainLink
                to={"/app/datasource/38db9b46-ad43-4370-a1ba-05a25f4756f2"}
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
