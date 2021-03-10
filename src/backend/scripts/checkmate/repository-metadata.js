const { store } = require("../../core/mongo");

const save = async (storeName, doc) => {
  try {
    await store(storeName, doc);
  } catch (err) {
    console.error("Error : could not store metadata in mongo");
    throw err;
  }
};

module.exports = { save };
