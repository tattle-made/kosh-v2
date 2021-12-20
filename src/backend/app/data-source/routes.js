const { StatusCodes } = require("http-status-codes");
const { bulkWrite } = require("../../core/mongo");
const {
  getPostFromDatasource,
  getPostFromDatasourceByType,
} = require("./repository-datasource");
const { getPostById, createPost } = require("./repository-post");

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

  expressApp.post(
    "/datasource/:datasourceId/posts",
    async (req, res) => {
      try {
        if (!Array.isArray(req.body)) {
          throw new Error("Error: body should be array")
        }
        req.body.forEach((post) => post.creator = req.user.id)
        await createPost(req.body);
        const writeOperation = req.body.map((post) => {
          return {
            updateOne: {
              filter: { "docs.doc_id": post.doc_id },
              update: { $set: { "docs.$[element].e_kosh_id": post.id }},
              arrayFilters: [{"element.doc_id": post.doc_id}]
            }
          }
        })
        await bulkWrite("kosh_metadata", "stories", writeOperation)
        res.status(StatusCodes.OK).send({});
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
