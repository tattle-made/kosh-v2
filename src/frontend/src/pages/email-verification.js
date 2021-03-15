import React, { useState, useEffect } from "react";
import { Box, Text, Button } from "grommet";
import { useQueryParam, StringParam } from "use-query-params";
import { navigate } from "gatsby";
import { setUser, emailVerification } from "../service/user-authentication";
import { ContentSection, BlockSection } from "../components/atoms/section";
import Layout from "../layouts";

/**
 * @author
 * @function EmailVerification
 **/
const EmailVerification = () => {
  const [token, setToken] = useQueryParam("token", StringParam);
  const [verifiedUser, setVerifiedUser] = useState({});

  console.log({ token });

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const verifiedUser = await emailVerification(token);
        console.log({ verifiedUser });
        setVerifiedUser(verifiedUser);
      } catch (err) {
        console.log("Error verifying email id", err);
      }
    };

    verifyEmail();
  }, [token]);

  const onContinueLoginClicked = () => {
    setUser(verifiedUser);
    navigate("/app/datasource", { replace: true });
  };

  return (
    <Layout>
      <ContentSection>
        <BlockSection>
          <Box>
            <Text>
              {" "}
              Your email has been verified. Please continue to login into Kosh
            </Text>
            <Box height={"2em"} />
            <Button
              primary
              label={"Continue to Kosh"}
              onClick={onContinueLoginClicked}
            />
          </Box>
        </BlockSection>
      </ContentSection>
    </Layout>
  );
};

export default EmailVerification;
