import React, { useState, useEffect } from "react";
import Layout from "../components/atoms/layout";

/**
 * @author
 * @function Index
 **/

const Index = () => {
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setFetching(true);
  });

  return <Layout>hello</Layout>;
};

export default Index;
