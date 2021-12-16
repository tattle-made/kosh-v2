const db = require("../../core/database/models");
const { post, datasource } = db.sequelize.models;

const PAGE_SIZE = 30;

let datasources = {};

/**
 * This implements a trivial in memory caching mechanism.
 * todo : replace, when needed with a redis like solution.
 */
const getDatasourceById = async (id) => {
  try {
    if (!datasources[id]) {
      const dataset = await datasource.findOne({ where: { id } });
      if (dataset) {
        datasources[id] = dataset.get({ plain: true });
      } else {
        return undefined;
      }
    }
    return datasources[id];
  } catch (err) {
    console.log("Error : Could not get Datasets");
    throw err;
  }
};

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

module.exports = {
  getPostFromDatasource,
  getPostFromDatasourceByType,
  getDatasourceById,
};
