const { Op } = require("sequelize");
const { Sequelize } = require("../../core/database/models");
const db = require("../../core/database/models");
const {post, datasource, postIndexHistory: PostIndexHistory} = db.sequelize.models;
const { getOne, get } = require("../../core/mongo");
const axios= require('axios');

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

const datasourceIndexStatus = async () => {
  try {
    const data = await post.findAll({
        group: ['datasource', 'index_status'],
        attributes: ['datasource', 'index_status', [Sequelize.fn('COUNT', 'index_status'), 'count']],
        raw: true,
        include: [{ model: datasource, as: 'dataset' }]
    })
    const responseStructure = {
      datasourceName: "",
      indexed: 0,
      failed: 0,
      blacklisted: 0
    }
    const result = {}
    data.forEach((post) => {
      if (!result[post.datasource]) result[post.datasource] = responseStructure
      result[post.datasource].id = post.datasource
      result[post.datasource].datasourceName = post["dataset.name"]
      result[post.datasource][post.index_status] = post.count
    })
    return Object.values(result)
  } catch (err) {
    console.log("Error : Could not get index status");
    throw err;
  }
}

const postIndexStatus = async (datasourceId) => {
  try {
    const data = await post.findAll({
        where: {
          datasource: datasourceId
        },
        limit: 100
    })
    return data
  } catch (err) {
    console.log("Error : Could not get index status");
    throw err;
  }
}

const blacklistPostIndex = async (datasourceId, customQuery) => {
  let query = {
    datasource: datasourceId,
    index_status: { [Op.notIn]: ["enqueued", "indexed"]}
  }
  if (customQuery) query = {...query, ...customQuery}
  try {
    return await post.update({
      index_status: 'blacklisted'
    }, {
      where: query
    });
  } catch (err) {
    console.log("Error : Could not blacklist Post status");
    throw err;
  }
}

const indexPosts = async (accessToken, query) => {
  const condition = [
    { index_status: null },
    { index_status: { [Op.notIn]: ["enqueued", "indexed"] } }
  ]
  if (query) condition.push(query)
  let posts;
  try {
      posts = await post.findAll({
          where: {
              [Op.or]: condition,
          },
      });
  } catch (e) {
      console.log(e)
      throw e;
  }
  const postsToIndex = {}
  const indexHistory = []
  posts.forEach((post) => {
      postsToIndex[post.id] = { 
          post: {
              id: post.id,
              media_type: post.type,
              media_url: post.media_url
          },
          config: { mode: "store" }
      }
      indexHistory.push({
          post_id: post.id,
          status: "enqueued"
      })
  })
  const METADATA_COLLECTION = "kosh_metadata"
  const FACTCHECK_DB = "kosh_metadata"
  const postsMetadata = await get(
    FACTCHECK_DB,
    METADATA_COLLECTION,
    { e_kosh_id: { $in: Object.keys(postsToIndex) } },
    { limit: 0, skip: 0 }
  )
  for await (const postMetadata of postsMetadata) {
      if (!postMetadata.e_kosh_id || !Object.keys(postsToIndex).includes(postMetadata.e_kosh_id)) continue
      postsToIndex[postMetadata.e_kosh_id]["metadata"] = {...postMetadata}
  }
  await PostIndexHistory.bulkCreate(indexHistory)
  await axios.post(process.env.INDEX_API_URL + "/index", Object.values(postsToIndex), {
      headers: { Authorization: "Bearer " + accessToken },
  })
}

module.exports = { getPostById, createPost, updatePostIndexStatus,
   datasourceIndexStatus, blacklistPostIndex, indexPosts, postIndexStatus };

