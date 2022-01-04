import React, { useEffect } from "react";
import { Box, Text, Menu } from "grommet";
import Logo from "./logo";
import { PlainLink } from "./links";
import { navigate } from "gatsby";
import { isLoggedIn, logout } from "../../service/user-authentication";
import { ContentSection } from "./section";
import { SearchInput } from "./search-input";
import { Menu as MenuIcon } from "react-feather";

const UserProfileInNavigation = ({ location }) => {
  const onLogoutClicked = () => {
    logout();
    navigate("/");
  };

  return isLoggedIn() ? (
    <Menu
      icon={<MenuIcon size={22} color={"#514E80AA"} style={{verticalAlign: "middle"}}/>}
      dropAlign={{ right: "right", top: "bottom" }}
      items={[
        { label: ' Index', onClick: () => navigate('/app/index') },
        { label: 'Tokens', onClick: () => navigate('/app/tokens') },
        { label: 'Logout', onClick: onLogoutClicked },
      ]}
      size="medium"
    />
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
