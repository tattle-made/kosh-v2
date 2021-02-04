const Joi = require("joi");
const db = require("../../core/database/models");

const { user } = db.sequelize.models;

const configure = (expressApp) => {
  expressApp.post("/auth/signup", async (req, res) => {
    // validate payload
    const payloadSchema = Joi.object({
      username: Joi.string().email(),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    });

    const { error, value } = payloadSchema.validate(req.body);

    if (error) {
      res.status(400).send(error.message);
    }

    let newUser;

    await user.sync();

    const dog = user.build({ email: "dog@tattle.co.in", password: "dog_pw" });
    console.log(dog instanceof user);
    console.log(dog.email);
    const test = await dog.save();

    // const test = await user.create({
    // username: "cat",
    // email: "cat@tattle.co.in",
    // password: "cat_pw",
    // role: "admin",
    // status: "verified",
    // });

    console.log({ user: test });

    // user
    // .create({
    // username: "test",
    // email: req.body.username,
    // password: req.body.password,
    // role: "reader",
    // status: "unverified",
    // })
    // .then((res) => {
    // console.log("created");
    // console.log(res);
    // })
    // .catch((err) => console.log(err));

    res.send("signup done");
    // store in db
    // send email
    // redirect to /verify-email
  });
  expressApp.post("/auth/login", (req, res) => {
    res.send("login");
    // validate payload
    // check db
  });
  expressApp.get("/auth/verify-email", (req, res) => {
    res.send("verify-token");
  });
  expressApp.delete("/auth/logout", (req, res) => {
    res.send("logout");
  });
  return expressApp;
};

module.exports = { configure };
