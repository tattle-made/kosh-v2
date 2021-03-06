import React, { useState, useEffect, useContext } from "react";
import { Box, Heading, Text, TextInput, Button, CheckBox } from "grommet";
import { signUp } from "../../service/user-authentication";
import { navigate } from "gatsby";
import { Link } from "../atoms/links";
import { BlockSection, ContentSection } from "../atoms/section";
import { NotificationContext } from "../atoms/context";

/**
 * @author
 * @function Login
 **/

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = React.useState(false);

  const { notification, setNotification } = useContext(NotificationContext);
  // const [value, setValue] = React.useState("");

  useEffect(() => {});

  const onSignUpClicked = async () => {
    try {
      const result = await signUp(email, password);
      setNotification({ visibility: true, message: result.message });
    } catch (error) {
      setNotification({ visibility: true, message: error.message });
    }
  };

  const isSignUpAllowed = () => {
    return email !== "" && password !== "" && checked !== false;
  };

  return (
    <ContentSection>
      <Box align={"center"}>
        <BlockSection>
          <Box gap={"small"}>
            <Heading level={2}>Sign Up</Heading>
            <TextInput
              placeholder="Email address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <Box gap={"xsmall"}>
              <TextInput
                placeholder="Password"
                value={password}
                type={"password"}
                onChange={(event) => setPassword(event.target.value)}
              />
              {/* <Text size={"xsmall"}>
                Include uppercase and lower case letter, number and a special
                character
              </Text> */}
            </Box>
          </Box>
          <Box height={"1.2em"}></Box>
          <Box direction={"row"} gap={"small"}>
            <CheckBox
              checked={checked}
              onChange={(event) => setChecked(event.target.checked)}
            />
            <Text size={"small"}>
              I have read the&nbsp;
              <Link to={"/terms-of-service"}>terms of service </Link>
            </Text>
          </Box>
          <Box height={"2em"}></Box>

          <Button
            disabled={!isSignUpAllowed()}
            primary
            label={"Sign Up"}
            onClick={onSignUpClicked}
          />
        </BlockSection>
      </Box>
    </ContentSection>
  );
};

export default SignUp;
