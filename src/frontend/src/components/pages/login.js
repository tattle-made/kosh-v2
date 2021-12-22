import React, { useState, useContext } from "react";
import { Box, TextInput, Button, Heading, Text } from "grommet";
import { login } from "../../service/user-authentication";
import { navigate } from "gatsby";
import { BlockSection, ContentSection } from "../atoms/section";
import { UserContext } from "../atoms/context";

/**
 * @author
 * @function Login
 **/

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);

  const onLoginClicked = async () => {
    try {
      const loggedInUser = await login(email, password);
      // console.log({ loggedInUser });
      setUser(loggedInUser);
      navigate("/app/datasource");
    } catch (error) {
      console.log(error.messsage);
    }
  };

  const isLoginAllowed = () => {
    return email !== "" && password !== "";
  };

  return (
    <ContentSection>
      <Box align={"center"}>
        <BlockSection>
          <Box gap={"small"}>
            <Heading level={2}>Login</Heading>
            <TextInput
              placeholder="Email address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextInput
              placeholder="Password"
              value={password}
              type={"password"}
              onChange={(event) => setPassword(event.target.value)}
            />
            <Box height={"2em"} />
            <Button
              disabled={!isLoginAllowed()}
              primary
              label={"Login"}
              onClick={onLoginClicked}
            />
          </Box>
        </BlockSection>
      </Box>
    </ContentSection>
  );
};

export default Login;
