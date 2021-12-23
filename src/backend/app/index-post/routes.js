const db = require("../../core/database/models");
const { StatusCodes } = require("http-status-codes");
const { updatePostIndexStatus } = require("../data-source/repository-post");

const PostIndexHistory = db.sequelize.models.postIndexHistory;

const configure = (expressApp) => {
    expressApp.post("/index/report", async (request, response) => {
        const indexHistory = {
            indexer_id: request.body.indexer_id,
            post_id: request.body.post_id,
            status_code: request.body.status_code,
            status: request.body.status
        }
        try {
            await PostIndexHistory.create(indexHistory)
            updatePostIndexStatus(indexHistory)
        } catch (err) {
            console.log("Error : Could not create Index History");
            throw err;
        }
        response
        .status(StatusCodes.OK)
        .send({ });
    })
}

module.exports = configure