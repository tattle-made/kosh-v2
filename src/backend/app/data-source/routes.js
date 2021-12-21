const { StatusCodes } = require("http-status-codes");
const {
  getPostFromDatasource,
  getPostFromDatasourceByType,
} = require("./repository-datasource");
const { getPostById, createPost } = require("./repository-post");
const { authorization } = require("../../core/http/middleware-authorization");
const { middleware: authorizationMiddleware, allow, block } = authorization;
const { isCreatorOfDataset } = require("./permissions");

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
  expressApp.post(
    "/datasource/:datasourceId/post",
    authorizationMiddleware([
      block("viewer"),
      allow("admin"),
      allow("author").onCondition(isCreatorOfDataset),
    ]),
    async (req, res) => {
      res.status(StatusCodes.OK).send({ message: "ok" });
    }
  );
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

  expressApp.post("/datasource/:datasourceId/posts", async (req, res) => {
    try {
      if (!Array.isArray(req.body.posts)) {
        throw new Error("Error: body should be array");
      }
      req.body.posts.forEach((post) => (post.creator = req.user.id));
      await createPost(req.body.posts);
      res.status(StatusCodes.OK).send({});
    } catch (err) {
      console.log(err);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: "Could not return post" });
    }
  });
};

module.exports = { configure };
