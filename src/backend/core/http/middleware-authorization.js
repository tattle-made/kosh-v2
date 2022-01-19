const { StatusCodes } = require("http-status-codes");

/**
 * Semantic Notions : This middleware is like a Guard. This Guard takes instructions of
 * allow and block and lets requests in or out depending on whether the request meets the conditions
 */

/**
 * Instruction has the shape {role, condition}
 * role is a string with possible values "viewer", "author", "admin"
 * condition is either a boolean or a function that returns a boolean
 */
class Instruction {
  constructor(role, condition) {
    this.role = role;
    this.condition = condition;
  }
  onCondition(func) {
    this.condition = func;
    return this;
  }
}

class InstructionFactory {
  static MakeAllowCondition(role) {
    return new Instruction(role, true);
  }
  static MakeBlockCondition(role) {
    return new Instruction(role, false);
  }
}

const authorization = {
  allow: (role) => InstructionFactory.MakeAllowCondition(role),
  block: (role) => InstructionFactory.MakeBlockCondition(role),
  middleware: (instructions) => {
    return async function (req, res, next) {
      for (let i = 0; i < instructions.length; i++) {
        const { user } = req;
        let requestShouldProceed = false;

        const applicableInstructionsArray = instructions.filter(
          (instruction) => instruction.role === user.role
        );

        if (applicableInstructionsArray.length === 0) {
          next();
        } else if (applicableInstructionsArray.length === 1) {
          const applicableInstruction = applicableInstructionsArray[0];
          if (typeof applicableInstruction.condition === "boolean") {
            requestShouldProceed = applicableInstruction.condition;
          } else if (typeof applicableInstruction.condition === "function") {
            requestShouldProceed = await applicableInstruction.condition(req);
          }
        } else {
          console.log("Unexpected State");
          return res.status(StatusCodes.FORBIDDEN).send("Unauthorized Access");
        }

        if (!requestShouldProceed) {
          return res.status(StatusCodes.FORBIDDEN).send("Unauthorized Access");
        }
      }
      next();
    };
  },
};

module.exports = authorization;
