import React, { useEffect } from "react";
import { Box, Text, Button } from "grommet";
import Logo from "./logo";
import { PlainLink } from "./links";
import { navigate } from "gatsby";
import { isLoggedIn, logout } from "../../service/user-authentication";
import { ContentSection } from "./section";
import { SearchInput } from "./search-input";

const UserProfileInNavigation = ({ location }) => {
  const onLogoutClicked = () => {
    logout();
    navigate("/");
  };

  return isLoggedIn() ? (
    <Box direction={"row"} gap={"medium"} align={"center"}>
      <PlainLink to={"/app/tokens"}>
        <Text size={"small"}>Tokens</Text>
      </PlainLink>
      <Button plain onClick={onLogoutClicked}>
        <Text size={"small"}>Logout</Text>
      </Button>
    </Box>
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
        <Box gap={"large"} direction={"row"}>
          <SearchInput />
          <UserProfileInNavigation location={location} />
        </Box>
      </Box>
    </ContentSection>
  );
};

export default Header;
