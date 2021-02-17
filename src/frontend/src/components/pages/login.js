import React, { useState } from "react";
import { Box, TextInput, Button } from "grommet";
import { login } from "../../service/user-authentication";
import { navigate } from "gatsby";
import { BlockSection, ContentSection } from "../atoms/section";

/**
 * @author
 * @function Login
 **/

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLoginClicked = async () => {
    try {
      await login(email, password);
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
      <BlockSection>
        <Box gap={"small"}>
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
    </ContentSection>
  );
};

export default Login;
