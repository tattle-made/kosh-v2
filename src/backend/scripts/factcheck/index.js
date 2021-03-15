const {
  connect,
  store,
  update,
  get,
  get2,
  count,
  store: storeInMongo,
} = require("../../core/mongo");
const { createPost, createMetadata, ReportManager } = require("./model");
const { v4: uuid } = require("uuid");
const { uploadData } = require("../../core/s3");
const db = require("../../core/database/models");
const { options, parameters } = require("./cli");
const {
  markDocAsRegistered,
  markDocAsFailed,
} = require("./repository-kosh-registration-status");
const { metadataCollectionName, creatorId, datasourceId } = parameters;
const reportManager = ReportManager();

console.log(`Running Script with parameters`, parameters);

const postKoshModel = db.sequelize.models.post;

/*
  - iterate through entire database and remove the onPortal flag
  - add a parameter called registrationStatus and set it to false
*/
const reconfigure = async () => {
  await connect();
  const storyCount = await count("factcheck_sites_dev", "stories", {});
  const docCount = { image: 0, video: 0, text: 0, others: 0, unknowns: 0 };
  const PAGE_SIZE = 10;

  console.log({ storyCount });
  console.log({ totalPages: storyCount / PAGE_SIZE });

  for (var i = 0; i <= storyCount / PAGE_SIZE; i++) {
    console.log(`Page Number ${i}`);
    const storyRes = await get(
      "factcheck_sites_dev",
      "stories",
      {},
      {
        limit: PAGE_SIZE,
        skip: i * PAGE_SIZE,
      }
    );

    for await (const doc of storyRes) {
      if (doc.docs !== undefined && Array.isArray(doc.docs)) {
        doc.docs.map(async (doc) => {
          // console.log(doc);
          try {
            await store("factcheck_sites_dev", "kosh_registration_status", {
              doc_id: doc.doc_id,
              post_id: doc.postID,
              status: "unregistered",
              retry_attempt: 0,
            });
          } catch (err) {
            console.log(
              `Error : could not fix registration status of ${doc.id}. Skipping `
            );
          }
        });
      } else {
        docCount.unknowns++;
      }
    }
    // console.log({ i });
  }
  console.log(docCount);
};

// const creatorId = "bc506460-8228-11eb-9e87-719e13e27321";
// const datasourceId = "7c62d659-8294-11eb-bd02-0242ac120004";

const register = async () => {
  await connect();
  const docCount = await count(
    "factcheck_sites_dev",
    "kosh_registration_status",
    { status: "unregistered" }
  );
  const PAGE_SIZE = 10;

  console.log({ docCount });
  console.log({ totalPages: docCount / PAGE_SIZE });

  for (var i = 0; i <= docCount / PAGE_SIZE; i++) {
    const docRes = await get(
      "factcheck_sites_dev",
      "kosh_registration_status",
      { status: "unregistered" },
      {
        limit: PAGE_SIZE,
        skip: i * PAGE_SIZE,
      }
    );
    for await (const doc of docRes) {
      // console.log(doc);
      const postRes = await get(
        "factcheck_sites_dev",
        "stories",
        {
          postID: doc.post_id,
        },
        { limit: 1, skip: 0 }
      );
      for await (const post of postRes) {
        if (post.docs && Array.isArray(post.docs)) {
          const docArray = post.docs.filter(
            (returnedDoc) => returnedDoc.doc_id === doc.doc_id
          );
          if (docArray.length !== 0) {
            const docToBeIngested = docArray[0];
            const postPayload = createPost(
              docToBeIngested,
              post,
              creatorId,
              datasourceId
            );
            const metadataPayload = createMetadata(post);
            const fileId = uuid();

            if (docToBeIngested.mediaType === "image") {
              // todo change url to fs.tattle one one here
              try {
                postPayload.media_url = docToBeIngested.s3URL;
                const postRes = await postKoshModel.create(postPayload);
                metadataPayload.fk_kosh = postRes.id;
                await storeInMongo(
                  "kosh_metadata_store",
                  metadataCollectionName,
                  metadataPayload
                );
                await markDocAsRegistered(docToBeIngested.doc_id);
              } catch (err) {
                console.log(`Error : could not ingest image`, err);
                await markDocAsFailed(docToBeIngested.doc_id);
              }
            } else if (docToBeIngested.mediaType === "video") {
              // todo video ingestion
            } else if (docToBeIngested.mediaType === "text") {
              // todo text ingestion
              try {
                await uploadData(docToBeIngested.content, fileId);
                postPayload.media_url = `https://fs.tattle.co.in/service/factcheck/file/${fileId}`;
                const postRes = await postKoshModel.create(postPayload);
                metadataPayload.fk_kosh = postRes.id;
                await storeInMongo(
                  "kosh_metadata_store",
                  metadataCollectionName,
                  metadataPayload
                );
                await markDocAsRegistered(docToBeIngested.doc_id);
              } catch (err) {
                console.log(`Error : could not ingest text`, err);
                await markDocAsFailed(docToBeIngested.doc_id);
              }
            } else {
              // todo others ingestion
            }
          }
        }
      }
    }
  }
};

try {
  // reconfigure();
  register();
} catch (err) {
  console.log(err);
}
