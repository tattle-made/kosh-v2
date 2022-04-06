import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Layer,
  List,
  Text,
} from "grommet";
import React, { useEffect } from "react";
import { ContentSection } from "../atoms/section";
import { Copy, Trash2 } from "react-feather";
import { deleteApi, get, postWithToken } from "../../service/backend";
import { Admin, Viewer, Author, AdminOrAuthor } from "../atoms/guard";

const Tokens = () => {
  const [show, setShow] = React.useState(false);
  const [tokens, setTokens] = React.useState([]);
  const [selectedToken, setSelectedToken] = React.useState({});

  useEffect(() => {
    getTokens();
  }, []);

  const getTokens = () => {
    get("/user/access-token")
      .then((response) => {
        setTokens(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteToken = () => {
    deleteApi("/user/access-token/" + selectedToken.id).then(() => {
      getTokens();
      setSelectedToken({});
      setShow(false);
    });
  };

  const addToken = () => {
    postWithToken("/user/access-token").then(() => {
      getTokens();
      setShow(false);
    });
  };

  const ListItem = (item) => {
    // Check if the clipboard is defined or needs to be loaded
    if (navigator && navigator.clipboard) {
      window.customClipBoard = navigator.clipboard;
    } else {
      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/clipboard-polyfill/2.7.0/clipboard-polyfill.promise.js";
      script.integrity = "sha256-waClS2re9NUbXRsryKoof+F9qc1gjjIhc2eT7ZbIv94=";
      script.crossOrigin = "anonymous";
      script.onload = () => { window.customClipBoard = clipboard; }
      document.body.appendChild(script);
    }

    return (
      <Box justify="between" direction="row" align="center" gap="small">
        <Text size="small" truncate={true} style={{ width: "90%" }}>
          {item.id}
        </Text>
        <Box direction="row" align="center" gap="medium">
          <Button
            alignSelf="start"
            plain={true}
            size="medium"
            icon={<Copy color={"#514E80AA"} size={22} />}
            style={{ border: "1px solid grey", borderRadius: 4, padding: 4 }}
            onClick={() => navigator.clipboard.writeText(item.token)}
          />
          <Button
            alignSelf="start"
            plain={true}
            size="medium"
            icon={<Trash2 color={"#514E80AA"} size={22} />}
            style={{ border: "1px solid grey", borderRadius: 4, padding: 4 }}
            onClick={() => {
              setShow(true);
              setSelectedToken(item);
            }}
          />
        </Box>
      </Box>
    );
  };

  const confirmationAlert = () => (
    <Layer
      onEsc={() => setShow(false)}
      onClickOutside={() => setShow(false)}
      modal={true}
      responsive={true}
    >
      <Card pad={"medium"}>
        <CardHeader justify="center">
          <Text>Alert</Text>
        </CardHeader>
        <CardBody justify="between" fill="vertical">
          <Text size="small" margin="small">
            Are you sure you want to DELETE this token
          </Text>
          <Box pad="small">
            <Button
              active={true}
              color={"brand"}
              label="Delete"
              onClick={deleteToken}
              size="small"
            />
            <Button
              label="Cancel"
              hoverIndicator
              onClick={() => setShow(false)}
              size="small"
            />
          </Box>
        </CardBody>
      </Card>
    </Layer>
  );

  return (
    <Box width={"large"} pad={"small"}>
      {/* <Heading size="small" margin="none">Tokens</Heading> */}
      {!tokens.length ? (
        <Text size="small" margin="small" color={"dark-3"}>
          Looks like you haven't gotten started yet!
        </Text>
      ) : (
        <List
          pad="small"
          margin={{
            top: "small",
          }}
          primaryKey="name"
          secondaryKey="percent"
          border={false}
          data={tokens}
          children={(item) => ListItem(item)}
        />
      )}
      <Box width={"small"} pad={"small"}>
        <Button
          fill={"false"}
          primary
          active={true}
          plain={false}
          label="Add"
          onClick={addToken}
        />
      </Box>
      {show && confirmationAlert()}
    </Box>
  );
};

export default Tokens;
