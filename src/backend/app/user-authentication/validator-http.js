const Joi = require("joi");

const newSignupPayload = async ({ email, password }) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().message("Email seems fishy"),
      password: Joi.string().min(5).message("Password too short"),
    });

    try {
      const value = await schema.validateAsync({ email, password });
      return value;
    } catch (error) {
      throw error;
    }
  } catch (err) {
    console.log("Error validating data");
    throw err;
  }
};

module.exports = {
  newSignupPayload,
};
