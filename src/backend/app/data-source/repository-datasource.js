const db = require("../../core/database/models");
const post = db.sequelize.models.post;

const PAGE_SIZE = 30;

const getPostFromDatasource = async (datasource, pageNum) => {
  try {
    const posts = await post.findAndCountAll({
      offset: pageNum * PAGE_SIZE - PAGE_SIZE,
      limit: PAGE_SIZE,
      order: [["createdAt", "DESC"]],
      where: {
        datasource,
      },
    });
    return {
      pageNum,
      totalPages: Math.ceil(posts.count / PAGE_SIZE),
      count: posts.count,
      posts: posts.rows,
    };
  } catch (err) {
    console.log("Error : Could not get Posts");
    throw err;
  }
};

const getPostFromDatasourceByType = async (datasource, type, pageNum) => {
  try {
    const posts = await post.findAndCountAll({
      offset: pageNum * PAGE_SIZE - PAGE_SIZE,
      limit: PAGE_SIZE,
      order: [["createdAt", "DESC"]],
      where: {
        datasource,
        type,
      },
    });
    return {
      pageNum,
      totalPages: Math.ceil(posts.count / PAGE_SIZE),
      count: posts.count,
      posts: posts.rows,
    };
  } catch (err) {
    console.log("Error : Could not get Posts");
    throw err;
  }
};

module.exports = { getPostFromDatasource, getPostFromDatasourceByType };
