const { StatusCodes } = require("http-status-codes");

/**
 * @param {function} role is a user's role. expedted values = "viewer", "author", "editor"
 * @returns an instruction. its shape is {role:condition}, where condition is a function that returns true or false
 * conditionType can only be "allow" or "block" for now
 */
const ConditionFactory = (conditionType) => {
  return (role) => {
    let instruction = {
      [role]: (req) =>
        conditionType === "allow"
          ? true
          : conditionType === "block"
          ? false
          : true,
    };

    return {
      ...instruction,
      onCondition: (func) => {
        return { [role]: func };
      },
    };
  };
};

const guard = {
  allow: ConditionFactory("allow"),
  block: ConditionFactory("block"),
  middleware: (instructions) => {
    return async function (req, res, next) {
      console.log("here");
      next();
      // for (let i = 0; i < instructions.length; i++) {
      //   const requestShouldProceed = await instructions.condition(req);
      //   if (requestShouldProceed) {
      //     next();
      //   } else {
      //     res.status(StatusCodes.FORBIDDEN).send("Unauthorized Access");
      //   }
      // }
    };
  },
};

module.exports = {
  guard,
};
