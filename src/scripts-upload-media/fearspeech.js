const axios = require("axios");
const path = require("path");
const { v4: uuid } = require("uuid");
require("dotenv").config({
    path: path.join(__dirname, "development.env"),
});
const stories = require("./fear_speech_data.json")

const accessToken = "access-token";
const datasource = "efb05069-e220-4b82-8849-98d14bffdafd";

const insertPost = async () => {
    const posts = []
    for (const post of Object.values(stories)) {
        const fileId = uuid();
        const { uploadData } = require("./s3");
        const awsResponse = await uploadData(post.message_text, fileId);
        post.s3URL = awsResponse.Location
        posts.push({
            type: "text",
            media_url: post.s3URL,
            preview: post.message_text && post.message_text.slice(0, 254),
            datasource
        })
    }
    const batchSize = 100;
    for (let i = 0, j = posts.length; i < j; i += batchSize) {
        const batch = posts.slice(i, i + batchSize);
        await axios.post(process.env.API_URL + `/datasource/${datasource}/posts`, batch, {
            headers: { Authorization: "Bearer " + accessToken },
        })
    }
    console.log("done")
    process.exit(0)
}

try {
    insertPost()
} catch (e) {
    console.log(e)
}
