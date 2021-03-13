import React from "react";
import { Box, Image, Text, Heading, Paragraph, Button } from "grommet";
import { ContentSection } from "../components/atoms/section";
import Layout from "../layouts";
import { useStaticQuery, Link } from "gatsby";

const Index = ({ location }) => {
  const { kosh_cover } = useStaticQuery(graphql`
    query {
      kosh_cover: file(relativePath: { eq: "kosh_cover.png" }) {
        childImageSharp {
          fluid {
            src
          }
        }
      }
    }
  `);

  console.log({ index_loc: location });
  return (
    <Layout location={location}>
      <ContentSection>
        <Box>
          <Box direction={"row-responsive"} gap={"medium"}>
            <Box overflow={"hidden"}>
              <Image
                src={kosh_cover.childImageSharp.fluid.src}
                fit="contain"
                fill={true}
              />
            </Box>
            <Box>
              <Heading level={3}>
                Kosh is the searchable archive of multi-media content relevant
                to misinformation and social media in India. It surfaces data
                collected by Tattle as well as that opened by other researchers.{" "}
              </Heading>
              <Paragraph>
                At Tattle, we believe, that we need more storytelling from India
                about the how, why and what of misinformation. The inability or
                difficulty of seeing what is circulating on platforms in India
                is one impediment to this storytelling. Kosh is an effort to
                overcome that impediment. You can use Kosh to search for the
                history of a message you may have received. You can use Kosh to
                track narratives over time. You can use Kosh for commentary on
                our media cultures. You can use Kosh to anticipate future
                trends. As with any archive, its meaning and purpose emerges
                from those who use it.
              </Paragraph>
              <Link to="/app/sign-up">
                <Button primary label={"Sign Up"} />
              </Link>
            </Box>
          </Box>
        </Box>
      </ContentSection>
    </Layout>
  );
};

export default Index;
