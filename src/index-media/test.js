const { default: axios } = require('axios');
const posts = {
    "post": {
        "id": "06a7823d-46a7-4c00-a865-6914534a7b7d",
        "media_type": "text",
        "media_url": "https://tattle-media.s3.amazonaws.com/399a98ed-b3d9-4dfd-b82f-d6fb1a7351a1",
        "datasource_id": "asdfd",
        "client_id": "123"
    },
    "config": {
        "mode": "enqueue",
        "version": "0.1"
    },
    "metadata": {
        "_id": "61cae20e2aa6952d0703b094",
        "e_kosh_id": "06a7823d-46a7-4c00-a865-6914534a7b7d",
        "annotation_list": [
            "Fear speech",
            "Fear speech",
            "Normal"
        ],
        "propagation": [
            {
                "group_id": 9087,
                "user_id": 229869,
                "timestamp": 1538130086000
            },
            {
                "group_id": 7,
                "user_id": 215,
                "timestamp": 1550186113000
            }
        ]
    }
}
const path = require("path");
require("dotenv").config({
    path: path.join(__dirname, "development.env"),
});
const accessToken = process.env.ACCESS_TOKEN

async function testIndexing() {
    try {
        await axios.post(process.env.API_URL + "/search", JSON.stringify(posts), {
            headers: { 
                Authorization: "Bearer " + accessToken,
                "Content-Type": "application/json"
            },
        })
    } catch (e) {
        console.log(e)
    }
}

testIndexing()