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
                    { index_status: { [Op.notIn]: ["enqueued", "indexed"] } }
                ],
            },
        });
    } catch (e) {
        console.log(e)
    }
    const postObject = {}
    const indexHistory = []
    posts.forEach((post) => {
        postObject[post.id] = { 
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
        { e_kosh_id: { $in: Object.keys(postObject) } },
        { limit: 0, skip: 0}
    )
    for await (const post of postsMetadata) {
        if (!post.e_kosh_id || !Object.keys(postObject).includes(post.e_kosh_id)) continue
        postObject[post.e_kosh_id]["metadata"] = {...post}
    }
    await PostIndexHistory.bulkCreate(indexHistory)
    await axios.post(process.env.API_URL + "/index", Object.values(postObject), {
        headers: { Authorization: "Bearer " + accessToken },
    })
    process.exit(0)
}

cron.schedule('* * * * *', indexPosts);