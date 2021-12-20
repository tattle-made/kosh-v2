const axios = require("axios");
const path = require("path");
const { v4: uuid } = require("uuid");
require("dotenv").config({
    path: path.join(__dirname, "development.env"),
});

const accessToken = "access-token";
const datasource = "60212d4c-e870-46a6-907b-88ef39e0b88f";
const knownMediaTypes = ['text', 'image', 'video'];
const ignoreMediaTypes = ['tweet', 'facebook', 'instagram'];

const insertPosts = async () => {
    const { connect, get } = require("../backend/core/mongo/index")
    await connect()

    const stories = await get(
        "kosh_metadata",
        "stories",
        { "docs.e_kosh_id": { $exists: false }, "docs.mediaType": { $nin: ignoreMediaTypes } },
        { limit: 100, skip: 0 }
    )
    const posts = []
    const unknownMediaTypes = new Set()
    for await (const story of stories) {
        if (!story.docs || !Array.isArray(story.docs)) {
            continue
        }
        for (const post of story.docs) {
            if (post.e_kosh_id) continue
            if (post.mediaType === "text" && !post.s3URL) {
                const fileId = uuid();
                const { uploadData } = require("./s3");
                const awsResponse = await uploadData(post.content, fileId);
                post.s3URL = awsResponse.Location
            }
            if (knownMediaTypes.includes(post.mediaType)) {
                posts.push({
                    id: uuid(),
                    doc_id: post.doc_id,
                    published_at: story.date_updated,
                    type: post.mediaType,
                    media_url: post.s3URL,
                    preview: post.content && post.content.slice(0, 254),
                    datasource
                })
            }
            else unknownMediaTypes.add(post.mediaType)
        }
    }
    const batchSize = 100;
    for (let i = 0, j = posts.length; i < j; i += batchSize) {
        const batch = posts.slice(i, i + batchSize);
        await axios.post(process.env.API_URL + `/datasource/${datasource}/posts`, batch, {
            headers: { Authorization: "Bearer " + accessToken },
        })
    }
    console.log(unknownMediaTypes)
    console.log("done")
    process.exit(0)
}

try {
    insertPosts()
} catch (e) {
    console.log(e)
}
