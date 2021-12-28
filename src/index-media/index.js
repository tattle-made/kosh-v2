const path = require("path")
require("dotenv").config({
    path: path.join(__dirname, "development.env"),
});
const { default: axios } = require('axios');
const cron = require('node-cron');
const { Op } = require("sequelize");// const axios = require("axios");
const db = require("../backend/core/database/models");
const { get, connect } = require('../backend/core/mongo');
const Post = db.sequelize.models.post;
const PostIndexHistory = db.sequelize.models.postIndexHistory;

const accessToken = process.env.ACCESS_TOKEN
const METADATA_COLLECTION = "kosh_metadata"
const FACTCHECK_DB = "kosh_metadata"

const indexPosts = async () => {
    let posts;
    try {
        posts = await Post.findAll({
            where: {
                [Op.or]: [
                    { index_status: null },
                    { index_status: { [Op.notIn]: ["enqueued", "indexed", "blacklisted"] } }
                ],
            },
        });
    } catch (e) {
        console.log(e)
        return
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
    await connect()
    const postsMetadata = await get(
        FACTCHECK_DB,
        METADATA_COLLECTION,
        { e_kosh_id: { $in: Object.keys(postsToIndex) } },
        { limit: 0, skip: 0}
    )
    for await (const post of postsMetadata) {
        if (!post.e_kosh_id || !Object.keys(postsToIndex).includes(post.e_kosh_id)) continue
        postsToIndex[post.e_kosh_id]["metadata"] = {...post}
    }
    await PostIndexHistory.bulkCreate(indexHistory)
    await Post.update({ index_status: "enqueued" }, {
        where: { id: { [Op.in]: Object.keys(postsToIndex) } }
    })
    const batchSize = 100;
    for (let i = 0, j = Object.values(postsToIndex).length; i < j; i += batchSize) {
        const batch = Object.values(postsToIndex).slice(i, i + batchSize);
        await axios.post(process.env.API_URL + "/index", batch, {
            headers: { Authorization: "Bearer " + accessToken },
        })
    }
    process.exit(0)
}

cron.schedule('* * * * *', indexPosts);