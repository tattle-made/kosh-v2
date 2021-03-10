const s3 = {
  upload: async (filename) => {
    const filePath = path.resolve(__dirname, `./media_items/${filename}`);
    const fileStream = fs.createReadStream(filePath);
    try {
      const result = await uploadFile(fileStream, filename);
      return result;
    } catch (err) {
      console.log(`Error : Could not upload ${filename}`);
      throw err;
    }
  },
};

const mongo = {
  save: async (doc) => {
    try {
      await run();
      await storeInMongo(parameter.METADATA_STORE_NAME, doc);
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = { s3, mongo };
