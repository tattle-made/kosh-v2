const AWS = require("aws-sdk");

const credentials = {
  accessKeyId: process.env.SERVICE_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.SERVICE_AWS_SECRET_ACCESS_KEY,
};
const bucketName = process.env.AWS_BUCKET_NAME;

const s3client = new AWS.S3({
  credentials,
});

const uploadData = async (data, fileName) => {
  // console.log("uploading data", bucketName);
  return new Promise((resolve) => {
    s3client.upload(
      {
        Bucket: bucketName,
        Key: fileName,
        Body: data,
      },
      (err, response) => {
        if (err) throw err;
        resolve(response);
      }
    );
  });
};

module.exports = { uploadData };
