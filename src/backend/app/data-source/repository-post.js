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

const createPost = async (posts) => {
  try {
    return await post.bulkCreate(posts, {returning: true});
  } catch (err) {
    console.log("Error : Could not create Post");
    throw err;
  }
}

const updatePostIndexStatus = async (indexHistory) => {
  try {
    return await post.update({
      index_status: indexHistory.status
    }, {
      where: {
        id: indexHistory.post_id
      }
    });
  } catch (err) {
    console.log("Error : Could not update Post status");
    throw err;
  }
}

module.exports = { getPostById, createPost, updatePostIndexStatus };
