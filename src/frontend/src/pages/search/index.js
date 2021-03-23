import React, { useLayoutEffect, useEffect } from "react";
import { ResponsiveContext, Heading, Box, Text } from "grommet";
import Layout from "../../layouts";
import { ContentSection } from "../../components/atoms/section";
import SearchResult from "../../components/atoms/search-result";
import SearchFilter from "../../components/atoms/search-filter";

const results = {
  posts: {
    pageNum: "1",
    totalPages: 60,
    count: 1799,
    posts: [
      {
        id: 6580,
        type: "image",
        published_at: "2020-05-21T14:53:29.000Z",
        media_url:
          "https://fs.tattle.co.in/service/kosh/file/b926b764-4e00-42c9-a1b9-8fe6cccea3d6",
        preview: "",
        creator: "d103beb0-83cd-11eb-8eb1-9d22f3b98bd1",
        datasource: "d1067dd0-83cd-11eb-8eb1-9d22f3b98bd1",
        createdAt: "2021-03-13T07:58:37.000Z",
        updatedAt: "2021-03-13T07:58:37.000Z",
      },
      {
        id: 6581,
        type: "image",
        published_at: "2020-07-25T08:42:02.000Z",
        media_url:
          "https://fs.tattle.co.in/service/kosh/file/c8709f21-bd7d-4e22-af14-50ad8a429f84",
        preview: "",
        creator: "d103beb0-83cd-11eb-8eb1-9d22f3b98bd1",
        datasource: "d1067dd0-83cd-11eb-8eb1-9d22f3b98bd1",
        createdAt: "2021-03-13T07:58:37.000Z",
        updatedAt: "2021-03-13T07:58:37.000Z",
      },
      {
        id: 6570,
        type: "image",
        published_at: "2020-06-21T04:33:12.000Z",
        media_url:
          "https://fs.tattle.co.in/service/kosh/file/3e45a077-f6ba-4d0e-aa29-ff71e4b22d6b",
        preview: "",
        creator: "d103beb0-83cd-11eb-8eb1-9d22f3b98bd1",
        datasource: "d1067dd0-83cd-11eb-8eb1-9d22f3b98bd1",
        createdAt: "2021-03-13T07:58:36.000Z",
        updatedAt: "2021-03-13T07:58:36.000Z",
      },
      {
        id: 6571,
        type: "video",
        published_at: "2020-07-02T09:13:24.000Z",
        media_url:
          "https://fs.tattle.co.in/service/kosh/file/07ba4a2f-c0a2-44ba-96d8-7b4cc94c8ee7",
        preview: "",
        creator: "d103beb0-83cd-11eb-8eb1-9d22f3b98bd1",
        datasource: "d1067dd0-83cd-11eb-8eb1-9d22f3b98bd1",
        createdAt: "2021-03-13T07:58:36.000Z",
        updatedAt: "2021-03-13T07:58:36.000Z",
      },
      {
        id: 6572,
        type: "image",
        published_at: "2020-07-10T16:14:27.000Z",
        media_url:
          "https://fs.tattle.co.in/service/kosh/file/888ac8ba-0f4a-49fc-a28c-bbf1c19ffb1d",
        preview: "",
        creator: "d103beb0-83cd-11eb-8eb1-9d22f3b98bd1",
        datasource: "d1067dd0-83cd-11eb-8eb1-9d22f3b98bd1",
        createdAt: "2021-03-13T07:58:36.000Z",
        updatedAt: "2021-03-13T07:58:36.000Z",
      },
      {
        id: 6573,
        type: "image",
        published_at: "2020-07-15T12:30:33.000Z",
        media_url:
          "https://fs.tattle.co.in/service/kosh/file/3ec9a977-e983-43fa-8d4e-61810cc5fe13",
        preview: "",
        creator: "d103beb0-83cd-11eb-8eb1-9d22f3b98bd1",
        datasource: "d1067dd0-83cd-11eb-8eb1-9d22f3b98bd1",
        createdAt: "2021-03-13T07:58:36.000Z",
        updatedAt: "2021-03-13T07:58:36.000Z",
      },
      {
        id: 6574,
        type: "video",
        published_at: "2020-07-19T19:00:38.000Z",
        media_url:
          "https://fs.tattle.co.in/service/kosh/file/9108aff1-5b15-4412-9837-58012be62386",
        preview: "",
        creator: "d103beb0-83cd-11eb-8eb1-9d22f3b98bd1",
        datasource: "d1067dd0-83cd-11eb-8eb1-9d22f3b98bd1",
        createdAt: "2021-03-13T07:58:36.000Z",
        updatedAt: "2021-03-13T07:58:36.000Z",
      },
      {
        id: 6575,
        type: "image",
        published_at: "2020-06-27T09:03:02.000Z",
        media_url:
          "https://fs.tattle.co.in/service/kosh/file/0a80ea98-f89b-4539-9e21-e468d5865c5f",
        preview: "",
        creator: "d103beb0-83cd-11eb-8eb1-9d22f3b98bd1",
        datasource: "d1067dd0-83cd-11eb-8eb1-9d22f3b98bd1",
        createdAt: "2021-03-13T07:58:36.000Z",
        updatedAt: "2021-03-13T07:58:36.000Z",
      },
      {
        id: 6576,
        type: "text",
        published_at: "2020-07-19T16:49:11.000Z",
        media_url:
          "https://fs.tattle.co.in/service/kosh/file/8d92a8a7-6e47-46af-8c85-736b687f0164",
        preview: " #?असम में बाढ़?",
        creator: "d103beb0-83cd-11eb-8eb1-9d22f3b98bd1",
        datasource: "d1067dd0-83cd-11eb-8eb1-9d22f3b98bd1",
        createdAt: "2021-03-13T07:58:36.000Z",
        updatedAt: "2021-03-13T07:58:36.000Z",
      },
      {
        id: 6577,
        type: "image",
        published_at: "2020-07-09T07:22:29.000Z",
        media_url:
          "https://fs.tattle.co.in/service/kosh/file/1d00588f-cc80-4481-88aa-4eaf091e9425",
        preview: "",
        creator: "d103beb0-83cd-11eb-8eb1-9d22f3b98bd1",
        datasource: "d1067dd0-83cd-11eb-8eb1-9d22f3b98bd1",
        createdAt: "2021-03-13T07:58:36.000Z",
        updatedAt: "2021-03-13T07:58:36.000Z",
      },
      {
        id: 6578,
        type: "image",
        published_at: "2020-07-18T09:44:33.000Z",
        media_url:
          "https://fs.tattle.co.in/service/kosh/file/509af802-ebcc-4194-9a61-472e456c40da",
        preview: "",
        creator: "d103beb0-83cd-11eb-8eb1-9d22f3b98bd1",
        datasource: "d1067dd0-83cd-11eb-8eb1-9d22f3b98bd1",
        createdAt: "2021-03-13T07:58:36.000Z",
        updatedAt: "2021-03-13T07:58:36.000Z",
      },
      {
        id: 6579,
        type: "image",
        published_at: "2020-06-28T14:31:56.000Z",
        media_url:
          "https://fs.tattle.co.in/service/kosh/file/ac0d86d2-281d-4645-82fc-d827321fc3f6",
        preview: "",
        creator: "d103beb0-83cd-11eb-8eb1-9d22f3b98bd1",
        datasource: "d1067dd0-83cd-11eb-8eb1-9d22f3b98bd1",
        createdAt: "2021-03-13T07:58:36.000Z",
        updatedAt: "2021-03-13T07:58:36.000Z",
      },
      {
        id: 6563,
        type: "video",
        published_at: "2020-07-15T15:50:57.000Z",
        media_url:
          "https://fs.tattle.co.in/service/kosh/file/8b51b3c8-3730-4f4a-8132-b0849c7ac579",
        preview: "",
        creator: "d103beb0-83cd-11eb-8eb1-9d22f3b98bd1",
        datasource: "d1067dd0-83cd-11eb-8eb1-9d22f3b98bd1",
        createdAt: "2021-03-13T07:58:35.000Z",
        updatedAt: "2021-03-13T07:58:35.000Z",
      },
      {
        id: 6564,
        type: "image",
        published_at: "2020-07-13T22:14:35.000Z",
        media_url:
          "https://fs.tattle.co.in/service/kosh/file/460f7392-92ac-4758-8918-ac2a7bf7c4ec",
        preview: "",
        creator: "d103beb0-83cd-11eb-8eb1-9d22f3b98bd1",
        datasource: "d1067dd0-83cd-11eb-8eb1-9d22f3b98bd1",
        createdAt: "2021-03-13T07:58:35.000Z",
        updatedAt: "2021-03-13T07:58:35.000Z",
      },
      {
        id: 6565,
        type: "video",
        published_at: "2020-07-15T07:42:21.000Z",
        media_url:
          "https://fs.tattle.co.in/service/kosh/file/d2f5184c-cd3c-4066-bf48-ce6bc395892e",
        preview: "",
        creator: "d103beb0-83cd-11eb-8eb1-9d22f3b98bd1",
        datasource: "d1067dd0-83cd-11eb-8eb1-9d22f3b98bd1",
        createdAt: "2021-03-13T07:58:35.000Z",
        updatedAt: "2021-03-13T07:58:35.000Z",
      },
      {
        id: 6566,
        type: "text",
        published_at: "2020-04-27T13:59:57.000Z",
        media_url:
          "https://fs.tattle.co.in/service/kosh/file/71d242ba-67dd-4f97-a55f-d2fe864561da",
        preview: "#??माँ तुझे सलाम ",
        creator: "d103beb0-83cd-11eb-8eb1-9d22f3b98bd1",
        datasource: "d1067dd0-83cd-11eb-8eb1-9d22f3b98bd1",
        createdAt: "2021-03-13T07:58:35.000Z",
        updatedAt: "2021-03-13T07:58:35.000Z",
      },
      {
        id: 6567,
        type: "video",
        published_at: "2020-07-07T03:56:34.000Z",
        media_url:
          "https://fs.tattle.co.in/service/kosh/file/afe3d23d-4b4b-46e5-b35f-d3bab7ea9c35",
        preview: "",
        creator: "d103beb0-83cd-11eb-8eb1-9d22f3b98bd1",
        datasource: "d1067dd0-83cd-11eb-8eb1-9d22f3b98bd1",
        createdAt: "2021-03-13T07:58:35.000Z",
        updatedAt: "2021-03-13T07:58:35.000Z",
      },
      {
        id: 6568,
        type: "image",
        published_at: "2020-07-10T15:04:09.000Z",
        media_url:
          "https://fs.tattle.co.in/service/kosh/file/0420ac3e-79db-4524-a681-bc19bfa634a4",
        preview: "",
        creator: "d103beb0-83cd-11eb-8eb1-9d22f3b98bd1",
        datasource: "d1067dd0-83cd-11eb-8eb1-9d22f3b98bd1",
        createdAt: "2021-03-13T07:58:35.000Z",
        updatedAt: "2021-03-13T07:58:35.000Z",
      },
      {
        id: 6569,
        type: "video",
        published_at: "2020-07-14T02:55:45.000Z",
        media_url:
          "https://fs.tattle.co.in/service/kosh/file/c061088a-89cf-4ffd-9bcc-825f3906cd74",
        preview: "",
        creator: "d103beb0-83cd-11eb-8eb1-9d22f3b98bd1",
        datasource: "d1067dd0-83cd-11eb-8eb1-9d22f3b98bd1",
        createdAt: "2021-03-13T07:58:35.000Z",
        updatedAt: "2021-03-13T07:58:35.000Z",
      },
      {
        id: 6553,
        type: "image",
        published_at: "2020-07-08T13:30:44.000Z",
        media_url:
          "https://fs.tattle.co.in/service/kosh/file/8ef9f6f9-f19e-4c48-8dde-d0ca9dc7d275",
        preview: "",
        creator: "d103beb0-83cd-11eb-8eb1-9d22f3b98bd1",
        datasource: "d1067dd0-83cd-11eb-8eb1-9d22f3b98bd1",
        createdAt: "2021-03-13T07:58:34.000Z",
        updatedAt: "2021-03-13T07:58:34.000Z",
      },
      {
        id: 6554,
        type: "image",
        published_at: "2020-07-28T18:20:54.000Z",
        media_url:
          "https://fs.tattle.co.in/service/kosh/file/2d6d24e9-6c45-4f72-af93-e7316a54e078",
        preview: "",
        creator: "d103beb0-83cd-11eb-8eb1-9d22f3b98bd1",
        datasource: "d1067dd0-83cd-11eb-8eb1-9d22f3b98bd1",
        createdAt: "2021-03-13T07:58:34.000Z",
        updatedAt: "2021-03-13T07:58:34.000Z",
      },
      {
        id: 6555,
        type: "text",
        published_at: "2020-05-11T06:46:37.000Z",
        media_url:
          "https://fs.tattle.co.in/service/kosh/file/e7ad9c5c-6cc1-45ab-902a-1c1549f30b82",
        preview:
          "वायरस से बचना है तो ये चार गलतियां कभी नही करें #?जाँच बचाए जान? #?कोरोना वायरस से बचाव #?आयुर्वेद #??‍♀️घरेलू नुस्खे https://youtu.be/SrIUK4hRtvk",
        creator: "d103beb0-83cd-11eb-8eb1-9d22f3b98bd1",
        datasource: "d1067dd0-83cd-11eb-8eb1-9d22f3b98bd1",
        createdAt: "2021-03-13T07:58:34.000Z",
        updatedAt: "2021-03-13T07:58:34.000Z",
      },
      {
        id: 6556,
        type: "video",
        published_at: "2020-07-11T08:05:13.000Z",
        media_url:
          "https://fs.tattle.co.in/service/kosh/file/c22c9f67-df5e-48a9-be8b-7389f8f111f3",
        preview: "",
        creator: "d103beb0-83cd-11eb-8eb1-9d22f3b98bd1",
        datasource: "d1067dd0-83cd-11eb-8eb1-9d22f3b98bd1",
        createdAt: "2021-03-13T07:58:34.000Z",
        updatedAt: "2021-03-13T07:58:34.000Z",
      },
      {
        id: 6557,
        type: "video",
        published_at: "2020-04-25T03:06:55.000Z",
        media_url:
          "https://fs.tattle.co.in/service/kosh/file/6614dce2-fbc4-4a1a-8a14-bbd98a9f7fa7",
        preview: "",
        creator: "d103beb0-83cd-11eb-8eb1-9d22f3b98bd1",
        datasource: "d1067dd0-83cd-11eb-8eb1-9d22f3b98bd1",
        createdAt: "2021-03-13T07:58:34.000Z",
        updatedAt: "2021-03-13T07:58:34.000Z",
      },
      {
        id: 6558,
        type: "image",
        published_at: "2020-05-11T10:45:28.000Z",
        media_url:
          "https://fs.tattle.co.in/service/kosh/file/95fa7230-5722-4160-aed5-06e694f3f693",
        preview: "",
        creator: "d103beb0-83cd-11eb-8eb1-9d22f3b98bd1",
        datasource: "d1067dd0-83cd-11eb-8eb1-9d22f3b98bd1",
        createdAt: "2021-03-13T07:58:34.000Z",
        updatedAt: "2021-03-13T07:58:34.000Z",
      },
      {
        id: 6559,
        type: "image",
        published_at: "2020-07-14T06:55:21.000Z",
        media_url:
          "https://fs.tattle.co.in/service/kosh/file/7c76e278-ac92-49bc-a610-7bf61489fdca",
        preview: "",
        creator: "d103beb0-83cd-11eb-8eb1-9d22f3b98bd1",
        datasource: "d1067dd0-83cd-11eb-8eb1-9d22f3b98bd1",
        createdAt: "2021-03-13T07:58:34.000Z",
        updatedAt: "2021-03-13T07:58:34.000Z",
      },
      {
        id: 6560,
        type: "video",
        published_at: "2020-07-10T12:25:40.000Z",
        media_url:
          "https://fs.tattle.co.in/service/kosh/file/b56b4762-24f0-4240-ba22-574efe03c72e",
        preview: "",
        creator: "d103beb0-83cd-11eb-8eb1-9d22f3b98bd1",
        datasource: "d1067dd0-83cd-11eb-8eb1-9d22f3b98bd1",
        createdAt: "2021-03-13T07:58:34.000Z",
        updatedAt: "2021-03-13T07:58:34.000Z",
      },
      {
        id: 6561,
        type: "image",
        published_at: "2020-07-25T03:06:01.000Z",
        media_url:
          "https://fs.tattle.co.in/service/kosh/file/a8724d63-fb15-4a9b-aadd-e34ef31754dc",
        preview: "",
        creator: "d103beb0-83cd-11eb-8eb1-9d22f3b98bd1",
        datasource: "d1067dd0-83cd-11eb-8eb1-9d22f3b98bd1",
        createdAt: "2021-03-13T07:58:34.000Z",
        updatedAt: "2021-03-13T07:58:34.000Z",
      },
      {
        id: 6562,
        type: "image",
        published_at: "2020-07-25T14:55:58.000Z",
        media_url:
          "https://fs.tattle.co.in/service/kosh/file/c80bb565-21bb-4888-8b7f-614e25a701e4",
        preview: "",
        creator: "d103beb0-83cd-11eb-8eb1-9d22f3b98bd1",
        datasource: "d1067dd0-83cd-11eb-8eb1-9d22f3b98bd1",
        createdAt: "2021-03-13T07:58:34.000Z",
        updatedAt: "2021-03-13T07:58:34.000Z",
      },
      {
        id: 6541,
        type: "video",
        published_at: "2020-07-12T03:55:42.000Z",
        media_url:
          "https://fs.tattle.co.in/service/kosh/file/d7e9eef7-e2fa-4bd5-b525-224b28e003dd",
        preview: "",
        creator: "d103beb0-83cd-11eb-8eb1-9d22f3b98bd1",
        datasource: "d1067dd0-83cd-11eb-8eb1-9d22f3b98bd1",
        createdAt: "2021-03-13T07:58:33.000Z",
        updatedAt: "2021-03-13T07:58:33.000Z",
      },
    ],
  },
};

const data = results.posts.posts;

export default function Index({ location }) {
  const size = React.useContext(ResponsiveContext);

  return (
    <Layout location={location}>
      <ContentSection>
        <Box flex={"grow"}>
          <Box gap={"medium"} direction={"row-responsive"}>
            <SearchFilter datasourceId={"abcd-ef"} />

            <SearchResult data={data} />
          </Box>
        </Box>
      </ContentSection>
    </Layout>
  );
}
