const axios = require("axios");
const path = require("path");
const { v4: uuid } = require("uuid");
const fs = require("fs")
require("dotenv").config({
    path: path.join(__dirname, "development.env"),
});
const stories = require("./fear_speech_data.json")

const accessToken = process.env.ACCESS_TOKEN;
const datasource = "efb05069-e220-4b82-8849-98d14bffdafd";

const failedRequestsFile = "fear-speech-failed-requests.json";
const insertPost = async () => {
    const posts = []
    for (const post of Object.values(stories)) {
        const fileId = uuid();
        const { uploadData } = require("./s3");
        await uploadData(post.message_text, fileId);
        post.s3URL = "https://fs.tattle.co.in/service/kosh/file/" + fileId
        posts.push({
            type: "text",
            media_url: post.s3URL,
            preview: post.message_text && post.message_text.slice(0, 254),
            datasource
        })
    }
    const result = {totalPosts: posts.length, failed: []}
    const batchSize = 100;
    for (let i = 0, j = posts.length; i < j; i += batchSize) {
        const batch = posts.slice(i, i + batchSize);
        try {
            await axios.post(
                process.env.API_URL + `/datasource/${datasource}/posts`,
                { posts: batch },
                { headers: { Authorization: "Bearer " + accessToken },
            })
        } catch (e) {
            console.log(e)
            result.failed.push(...batch)
            continue
        }
    }
    console.log('\n')
    if (result.failed.length) {
        fs.writeFileSync(failedRequestsFile, JSON.stringify(result.failed), {encoding: 'utf-8'})
        console.log(`check ${failedRequestsFile} file for failed posts`)
    }
    console.log("Total Posts: " + result.totalPosts)
    console.log("Failed: " + result.failed.length)
    console.log("done")
    process.exit(0)
}

try {
    insertPost()
} catch (e) {
    console.log(e)
}
