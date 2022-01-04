const { default: axios } = require('axios');
const posts = require("./test.json")
const accessToken = process.env.ACCESS_TOKEN
const path = require("path");
require("dotenv").config({
    path: path.join(__dirname, "development.env"),
});

async function testIndexing() {
    await axios.post(process.env.API_URL + "/index", posts, {
        headers: { Authorization: "Bearer " + accessToken },
    })
}

testIndexing()