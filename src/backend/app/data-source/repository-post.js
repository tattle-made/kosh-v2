const db = require("../../core/database/models");
const post = db.sequelize.models.post;
const { getOne } = require("../../core/mongo");

const datasourceToCollectionMap = {
  "7c62d659-8294-11eb-bd02-0242ac120004": "tattle_team_factcheck",
  "bc55e2a0-8228-11eb-9e87-719e13e27321": "tattle_team_checkmate",
  "bc58a1c0-8228-11eb-9e87-719e13e27321": "tattle_team_checkmate",
};

const getPostById = async (datasourceId, postId) => {
  try {
    const posts = await post.findAll({
      where: {
        id: postId,
      },
    });

    const metadata = await getOne(
      "kosh_metadata_store",
      datasourceToCollectionMap[datasourceId],
      { fk_kosh: postId }
    );

    console.log({ postId, dID: datasourceToCollectionMap[datasourceId] });
    console.log({ METADATA: metadata });

    return {
      post: posts[0],
      metadata,
    };
  } catch (err) {
    console.log("Error : Could not get Posts");
    throw err;
  }
};

module.exports = { getPostById };
