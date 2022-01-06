import React, { useState, useEffect } from "react";
import DataSources from "../components/pages/datasources";
import DataSource from "../components/pages/datasource";
import PostDetails from "../components/atoms/post-details";
import Login from "../components/pages/login";
import SignUp from "../components/pages/signup";
import EmailVerification from "./email-verification";
import {
  PrivateRoute,
  DisabledForLoggedInUser,
} from "../components/atoms/private-route";
import Layout from "../layouts";
import { Router } from "@reach/router";
import Tokens from "../components/pages/tokens";
import DatasourceIndex from "../components/pages/index/datasource";
import PostsIndex from "../components/pages/index/posts";
import SearchPost from "../components/pages/search";

/**
 * @author
 * @function App
 **/

const App = ({ location }) => {
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setFetching(true);
  });

  return (
    <Layout location={location}>
      <Router basepath={"/app"}>
        <PrivateRoute component={DataSources} path={"/datasource"} />
        <PrivateRoute
          component={DataSource}
          path={"/datasource/:datasourceId"}
        />
        <PrivateRoute
          component={PostDetails}
          path={"/datasource/:datasourceId/:postId"}
        />
        <PrivateRoute
          component={Tokens}
          path={"/tokens"}
        />
        <PrivateRoute
          component={DatasourceIndex}
          path={"/index"}
        />
        <PrivateRoute
          component={PostsIndex}
          path={"/index/:datasourceName"}
        />
        <PrivateRoute
          component={SearchPost}
          path={"/search"}
        />
        <DisabledForLoggedInUser component={Login} path={"/login"} />
        <DisabledForLoggedInUser component={SignUp} path={"/sign-up"} />
      </Router>
    </Layout>
  );
};

export default App;
