const db = require("../../core/database/models");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const {
  updatePostIndexStatus,
  datasourceIndexStatus,
  postIndexStatus,
  blacklistPostIndex,
  indexPosts,
} = require("../data-source/repository-post");
const { Op } = require("sequelize");

const PostIndexHistory = db.sequelize.models.postIndexHistory;

const configure = (expressApp) => {
  expressApp.post("/index/report", async (req, res) => {
    const indexHistory = {
      indexer_id: req.body.indexer_id,
      post_id: req.body.post_id,
      status_code: req.body.status_code,
      status: req.body.status,
    };
    try {
      await PostIndexHistory.create(indexHistory);
      const condition = { id: indexHistory.post_id };
      await updatePostIndexStatus(indexHistory.status, condition);
    } catch (err) {
      console.log("Error : Could not create Index History");
      throw err;
    }
    res.status(StatusCodes.OK).send({});
  });

  expressApp.get("/index/datasource", async (_req, res) => {
    try {
      const post = await datasourceIndexStatus();
      res.status(StatusCodes.OK).send(post);
    } catch (err) {
      console.log(err);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: "Could not get post index" });
    }
  });

  expressApp.post("/index/datasource/:datasourceId", async (req, res) => {
    try {
      const accessToken = jwt.sign(req.user, process.env.ACCESS_TOKEN_SECRET);
      const query = { datasource: req.params.datasourceId };
      const post = await indexPosts(accessToken, query);
      res.status(StatusCodes.OK).send(post);
    } catch (err) {
      console.log(err);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: "Could not index" });
    }
  });

  expressApp.patch(
    "/index/datasource/:datasourceId/blacklist",
    async (req, res) => {
      try {
        const post = await blacklistPostIndex(req.params.datasourceId);
        res.status(StatusCodes.OK).send(post);
      } catch (err) {
        console.log(err);
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send({ error: "Could not blacklist index" });
      }
    }
  );

  expressApp.get("/index/datasource/:datasourceId/post", async (req, res) => {
    try {
      const post = await postIndexStatus(req.params.datasourceId);
      res.status(StatusCodes.OK).send(post);
    } catch (err) {
      console.log(err);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: "Could not get post index" });
    }
  });

  expressApp.post("/index/datasource/:datasourceId/post", async (req, res) => {
    try {
      if (!req.body.postIds || !req.body.postIds.length) throw "Ids missing";
      const query = { id: { [Op.in]: req.body.postIds } };
      const accessToken = jwt.sign(req.user, process.env.ACCESS_TOKEN_SECRET);
      const post = await indexPosts(accessToken, query);
      res.status(StatusCodes.OK).send(post);
    } catch (err) {
      console.log(err);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: "Could not get post index" });
    }
  });

  expressApp.patch(
    "/index/datasource/:datasourceId/post/blacklist",
    async (req, res) => {
      try {
        if (!req.body.postIds || !req.body.postIds.length) throw "Ids missing";
        const query = { id: { [Op.in]: req.body.postIds } };
        const post = await blacklistPostIndex(req.params.datasourceId, query);
        res.status(StatusCodes.OK).send(post);
      } catch (err) {
        console.log(err);
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send({ error: "Could not blacklist index" });
      }
    }
  );
};

module.exports = configure;
