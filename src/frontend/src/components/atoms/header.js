import React, { useEffect, useRef, useState } from "react";
import { Box, Text, Menu, Drop, Button } from "grommet";
import Logo from "./logo";
import { PlainLink } from "./links";
import { navigate } from "gatsby";
import { isLoggedIn, logout } from "../../service/user-authentication";
import { ContentSection } from "./section";
import { SearchInput } from "./search-input";
import { Menu as MenuIcon } from "react-feather";
import { Admin, AdminOrAuthor } from "./guard";

const UserProfileInNavigation = ({ location }) => {
  const menuRef = useRef();
  const [menuToggle, setMenuToggle] = useState(false);
  const onLogoutClicked = () => {
    console.log("here");
    logout();
    navigate("/");
  };

  function toggleMenu() {
    setMenuToggle(!menuToggle);
    console.log(menuToggle);
  }

  return isLoggedIn() ? (
    // <Menu
    //   icon={
    //     <MenuIcon
    //       size={22}
    //       color={"#514E80AA"}
    //       style={{ verticalAlign: "middle" }}
    //     />
    //   }
    //   dropAlign={{ right: "right", top: "bottom" }}
    //   items={[
    //     { label: "Datasets", onClick: () => navigate("/app/datasource") },
    //     { label: "Search", onClick: () => navigate("/app/search") },
    //     { label: "Index", onClick: () => navigate("/app/index") },
    //     { label: "Tokens", onClick: () => navigate("/app/tokens") },
    //     { label: "Logout", onClick: onLogoutClicked },
    //   ]}
    //   size="medium"
    // ></Menu>
    <Box>
      <Box onClick={toggleMenu} focusIndicator={false}>
        <MenuIcon
          size={22}
          color={"#514E80AA"}
          style={{ verticalAlign: "middle" }}
          ref={menuRef}
        />
      </Box>
      {menuToggle && (
        <Drop
          align={{ top: "bottom", right: "right" }}
          target={menuRef.current}
        >
          <Box pad="small" gap={"small"}>
            <Button
              focusIndicator={false}
              onClick={() => {
                toggleMenu();
                navigate("/app/datasource");
              }}
            >
              Datasets
            </Button>
            <Button
              focusIndicator={false}
              onClick={() => {
                toggleMenu();
                navigate("/app/search");
              }}
            >
              Search
            </Button>
            <Admin>
              <Button
                focusIndicator={false}
                onClick={() => {
                  toggleMenu();
                  navigate("/app/index");
                }}
              >
                Index
              </Button>
            </Admin>
            <AdminOrAuthor>
              <Button
                focusIndicator={false}
                onClick={() => {
                  toggleMenu();
                  navigate("/app/tokens");
                }}
              >
                Tokens
              </Button>
            </AdminOrAuthor>
            <Button focusIndicator={false} onClick={onLogoutClicked}>
              Logout
            </Button>
          </Box>
        </Drop>
      )}
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
          {/* <SearchInput /> */}
          <UserProfileInNavigation location={location} />
        </Box>
      </Box>
    </ContentSection>
  );
};

export default Header;
