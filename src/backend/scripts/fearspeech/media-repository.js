const { v4: uuid } = require("uuid");
const { uploadFile } = require("../../core/s3");

const upload = async (data, fileName) => {
  try {
    const result = await uploadFile(data, fileName);
    return result;
  } catch (err) {
    console.log(`Error : Could not upload ${fileName}`);
    throw err;
  }
};

module.exports = { upload };
