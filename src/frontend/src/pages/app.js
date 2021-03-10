import React, { useState, useEffect } from "react";
import DataSources from "../components/pages/datasources";
import DataSource from "../components/pages/datasource";
import PostDetails from "../components/atoms/post-details";
import Login from "../components/pages/login";
import SignUp from "../components/pages/signup";
import EmailVerification from "../components/pages/email-verification";
import {
  PrivateRoute,
  DisabledForLoggedInUser,
} from "../components/atoms/private-route";
import Layout from "../layouts";
import { Router } from "@reach/router";

/**
 * @author
 * @function App
 **/

const App = () => {
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setFetching(true);
  });

  return (
    <Layout>
      <Router basepath={"/app"}>
        <PrivateRoute component={DataSources} path={"/datasource"} />
        <PrivateRoute
          component={DataSource}
          path={"/datasource/:datasourceId"}
        />
        <PrivateRoute
          component={PostDetails}
          path={"/datasource/:datasourceId/post/:postId"}
        />
        <DisabledForLoggedInUser component={Login} path={"/login"} />
        <DisabledForLoggedInUser component={SignUp} path={"/sign-up"} />
        <DisabledForLoggedInUser
          component={EmailVerification}
          path="/email-verification"
        />
      </Router>
    </Layout>
  );
};

export default App;
