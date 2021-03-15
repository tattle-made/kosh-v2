const fs = require("fs");
const path = require("path");
const { uploadFile } = require("../../core/s3");

const upload = async (filePath, fileName) => {
  try {
    const fileStream = fs.createReadStream(filePath);
    const result = await uploadFile(fileStream, fileName);
    return result;
  } catch (err) {
    console.log(`Error : Could not upload ${fileName}`);
    throw err;
  }
};

module.exports = { upload };
