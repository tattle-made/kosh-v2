const { StatusCodes } = require("http-status-codes");
const {
  getPostFromDatasource,
  getPostFromDatasourceByType,
} = require("./repository-datasource");
const { getPostById } = require("./repository-post");

const configure = (expressApp) => {
  expressApp.get("/datasource/:datasourceId/posts", async (req, res) => {
    const { datasourceId } = req.params;
    let { page, type } = req.query;

    page = page === undefined ? 1 : page;
    type = type === undefined ? "all" : type;

    if (type === "all") {
      const posts = await getPostFromDatasource(datasourceId, page);
      res.status(StatusCodes.OK).send({ posts: posts });
    } else {
      const posts = await getPostFromDatasourceByType(datasourceId, type, page);
      res.status(StatusCodes.OK).send({ posts: posts });
    }
  });
  expressApp.get(
    "/datasource/:datasourceId/posts/:postId",
    async (req, res) => {
      const { datasourceId, postId } = req.params;
      try {
        const post = await getPostById(datasourceId, postId);
        res.status(StatusCodes.OK).send(post);
      } catch (err) {
        console.log(err);
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send({ error: "Could not return post" });
      }
    }
  );
};

module.exports = { configure };
