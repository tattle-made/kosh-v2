const { createToken, activeTokens, deleteToken } = require("./access-token");

const configure = (expressApp) => {
    expressApp.get("/user/access-token", (request, response) => {
        activeTokens(request, response)
    })
    expressApp.post("/user/access-token", (request, response) => {
        createToken(request, response)
    })
    expressApp.delete("/user/access-token/:id", (request, response) => {
        deleteToken(request, response)
    })
}

module.exports = { configure };
