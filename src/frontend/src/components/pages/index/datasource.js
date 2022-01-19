import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  List,
  Menu,
  Text,
} from "grommet";
import React, { useEffect } from "react";
import { ContentSection } from "../../atoms/section";
import { Menu as MenuIcon } from "react-feather";
import { get, patch, post, postWithToken } from "../../../service/backend";
import { navigate } from "gatsby";

const DatasourceIndex = () => {
  const [indexStatus, setIndexStatus] = React.useState([]);

  useEffect(() => {
    datasourceIndexStatus();
  }, []);

  const datasourceIndexStatus = () => {
    get("/index/datasource")
      .then((response) => {
        setIndexStatus(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const indexDatasource = (datasourceId) => {
    postWithToken(`/index/datasource/${datasourceId}`)
      .then((response) => {
        // setIndexStatus(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const preventIndex = (datasourceId) => {
    patch(`/index/datasource/${datasourceId}/blacklist`)
      .then((response) => {
        datasourceIndexStatus();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const ListItem = ({ item }) => {
    return (
      <Card background="light">
        <CardHeader
          focusIndicator={false}
          pad="medium"
          onClick={() =>
            navigate(`/app/index/${item.datasourceName}`, {
              state: { id: item.id },
            })
          }
        >
          <Text>{item.datasourceName}</Text>
          <Menu
            icon={
              <MenuIcon
                size={22}
                color={"#514E80AA"}
                style={{ verticalAlign: "middle" }}
              />
            }
            dropAlign={{ right: "right", top: "bottom" }}
            items={[
              {
                label: "Index Now",
                onClick: (e) => {
                  e.stopPropagation();
                  indexDatasource(item.id);
                },
              },
              {
                label: "Prevent Index",
                onClick: (e) => {
                  e.stopPropagation();
                  preventIndex(item.id);
                },
              },
            ]}
            onClick={(e) => e.stopPropagation()}
          />
        </CardHeader>
        <CardBody pad="small" direction="row" gap={"xsmall"}>
          <Box
            pad="xsmall"
            round={"xsmall"}
            background="visuals-1"
            height={"fit-content"}
          >
            <Text size={"xsmall"}>Success: {item.indexed}</Text>
          </Box>
          <Box
            pad="xsmall"
            round={"xsmall"}
            background="visuals-1"
            height={"fit-content"}
          >
            <Text size={"xsmall"}>Failed: {item.failed}</Text>
          </Box>

          <Box
            pad="xsmall"
            round={"xsmall"}
            background="visuals-1"
            height={"fit-content"}
          >
            <Text size={"xsmall"}>Blacklisted: {item.blacklisted}</Text>
          </Box>
        </CardBody>
      </Card>
    );
  };

  return (
    <ContentSection>
      {/* <Heading size="small" margin="none">Index</Heading> */}
      {!indexStatus.length ? (
        <Text size="small" margin="small" color={"dark-3"}>
          Looks like you haven't gotten started yet!
        </Text>
      ) : (
        <Box>
          <Box width={"fit-content"} direction="row" wrap={true} gap={"medium"}>
            {indexStatus.map((indexItem) => (
              <ListItem item={indexItem} />
            ))}
          </Box>
        </Box>
      )}
    </ContentSection>
  );
};

export default DatasourceIndex;
