const db = require("../../core/database/models");
const bcrypt = require("bcrypt");

const { user } = db.sequelize.models;

/**
 *
 * @param {*} param0
 * returns
 *  {message, result, code}
 *  if code
 */
const create = async ({ email, password, verified }) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await user.findOne({ where: { email: email } });
    if (existingUser === null) {
      const newUser = await user.create({
        email,
        password: hashedPassword,
        status: verified ? "verified" : "unverified",
        role: "author",
      });
      return newUser;
    } else {
      throw new Error("This email id is already registered with us.");
    }
  } catch (err) {
    console.log("Error : Could not create New User");
    throw err;
  }
};

/**
 *
 * @param {string} email : email id of a pre-registered user
 * returns null or user
 */
const findByEmail = async ({ email }) => {
  try {
    const result = await user.findOne({ where: { email: email } });
    return result.toJSON();
  } catch (err) {
    console.log("Error: could not find by email");
    throw err;
  }
};

const findByEmailPassword = async ({ email, password }) => {
  try {
    const result = await user.findOne({ where: { email: email } });
    if (result === null) {
      throw new Error("Could not find any user with that email");
    } else {
      try {
        const comp = await bcrypt.compare(password, result.password);
        if (comp) {
          return result;
        } else {
          throw new Error("Incorrect username and password combination");
        }
      } catch (error) {
        console.log("Error : Error comparing passwords", error);
        throw error;
      }
    }
  } catch (err) {
    console.log("Error: could not login user");
    throw err;
  }
};

// todo : return verified user
const verifyToken = async ({ verificationToken }) => {
  try {
    const result = await user.findOne({
      where: { verificationToken: verificationToken },
    });
    if (result === null) {
      throw new Error("Error: You are not who you claim to be.");
    } else {
      result.status = "verified";
      await result.save({ fields: ["status"] });
      await result.reload();
      return result;
    }
  } catch (err) {
    console.log("Error: could not update verification status");
    throw err;
  }
};

const updateVerificationStatus = async ({ id, status }) => {
  try {
    const result = await user.findOne({ where: { id: id } });
    if (result === null) {
      throw new Error(
        "Error: you are trying to update status for a user who does not exist"
      );
    } else {
      result.status = status;
      await result.save({ fields: ["status"] });
    }
  } catch (err) {
    console.log("Error: could not update verification status");
    throw err;
  }
};

/**
 * Allowed values of role must be confirmed in core/database/models/user.js
 * @param {*} param0
 */
const updateRole = async ({ id, role }) => {
  try {
    const result = await user.findOne({ where: { id: id } });
    if (result === null) {
      throw new Error(
        "Error: you are trying to update role for a user who does not exist"
      );
    } else {
      result.role = role;
      await result.save({ fields: ["role"] });
    }
  } catch (err) {
    console.log("Error: could not update user role");
    throw err;
  }
};

const blockUser = async ({ id }) => {
  try {
    const result = await user.findOne({ where: { id: id } });
    if (result === null) {
      throw new Error(
        "Error: you are trying to update status for a user who does not exist"
      );
    } else {
      result.status = "blocked";
      await result.save({ fields: ["status"] });
    }
  } catch (err) {
    console.log("Error: could not update verification status");
    throw err;
  }
};

const deleteUser = async ({ id }) => {
  try {
    const result = await user.findOne({ where: { id: id } });
    if (result === null) {
      throw new Error(
        "Error: you are trying to delete a user who does not exist"
      );
    } else {
      result.status = "deleted";
      await result.save({ fields: ["status"] });
    }
  } catch (err) {
    console.log("Error: could not delete user");
    throw err;
  }
};

module.exports = {
  create,
  findByEmail,
  findByEmailPassword,
  verifyToken,
  updateVerificationStatus,
  blockUser,
  deleteUser,
};
