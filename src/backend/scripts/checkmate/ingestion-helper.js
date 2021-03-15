const util = require("util");
const fs = require("fs");

const deriveFileExtention = (type) => {
  switch (type) {
    case "video":
      return "mp4";
    case "image":
      return "jpg";
    case "text":
      return "txt";
    default:
      return "undefined";
  }
};

const stats = async (dir) => {
  console.log(__dirname);
  const readDirPromise = util.promisify(fs.readdir);
  try {
    const files = await readDirPromise(dir);
    return files;
  } catch (err) {
    console.log("Error : Could not read contents of directory");
    throw err;
  }
};

module.exports = {
  deriveFileExtention,
  stats,
};
