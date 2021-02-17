import React, { useEffect } from "react";
import { Box, Text, Button } from "grommet";
import Logo from "./logo";
import { PlainLink } from "./links";
import { navigate } from "gatsby";
import { isLoggedIn, logout } from "../../service/user-authentication";
import { ContentSection } from "./section";

const UserProfileInNavigation = ({ location }) => {
  const onLogoutClicked = () => {
    logout();
    navigate("/");
  };

  return isLoggedIn() ? (
    <Button plain onClick={onLogoutClicked}>
      <Text size={"small"}>Logout</Text>
    </Button>
  ) : (
    <Box direction={"row"} gap={"medium"} align={"center"}>
      <PlainLink to={"/app/login"}>
        <Text size={"small"}>Login</Text>
      </PlainLink>
      <PlainLink to={"/app/sign-up"}>
        <Text size={"small"}>Sign Up</Text>
      </PlainLink>
    </Box>
  );
};

/**
 * @author
 * @function Header
 **/

const Header = ({ location }) => {
  useEffect(() => {
    // setFetching(true);
  });

  return (
    <ContentSection>
      <Box direction={"row"} wrap={true}>
        <Logo />
        <Box flex={"grow"}></Box>
        {/* <Text>{user.id}</Text> */}
        <UserProfileInNavigation location={location} />
      </Box>
    </ContentSection>
  );
};

export default Header;
