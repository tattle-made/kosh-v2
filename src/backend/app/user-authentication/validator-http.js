const Joi = require("joi");

const newSignupPayload = async ({ email, password }) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().message("Email seems fishy"),
      password: Joi.string()
        .pattern(
          new RegExp("^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#_$%^&*]{3,30}$")
        )
        .message("Password is too easy"),
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
