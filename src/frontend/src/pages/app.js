import React, { useState, useEffect } from "react";
import DataSource from "../components/pages/datasource";
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
        <PrivateRoute component={DataSource} path={"/datasource"} />
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
