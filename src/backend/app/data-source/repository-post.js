const db = require("../../core/database/models");
const post = db.sequelize.models.post;
const { getOne } = require("../../core/mongo");

const getPostById = async (datasourceId, postId) => {
  try {
    const posts = await post.findAll({
      where: {
        id: postId,
      },
    });

    const metadata = await getOne("kosh_metadata_store", datasourceId, {
      fk_kosh: postId,
    });

    console.log({ postId, dID: datasourceId });
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
