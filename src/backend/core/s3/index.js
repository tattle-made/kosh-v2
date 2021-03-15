const AWS = require("aws-sdk");

const credentials = {
  accessKeyId: process.env.SERVICE_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.SERVICE_AWS_SECRET_ACCESS_KEY,
};

const useLocal = process.env.NODE_ENV === "development";
const bucketName = process.env.AWS_BUCKET_NAME;

const s3client = new AWS.S3({
  credentials,
  endpoint: useLocal ? "http://localstack:4566" : undefined,
  s3ForcePathStyle: true,
});

const uploadFile = async (data, fileName) => {
  console.log("uploading file");
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

const uploadData = async (data, fileName) => {
  console.log("uploading data");
  return new Promise((resolve) => {
    s3client.upload(
      {
        Bucket: bucketName,
        Key: fileName,
        Body: JSON.stringify(data, "utf-8"),
      },
      (err, response) => {
        if (err) throw err;
        resolve(response);
      }
    );
  });
};

module.exports = { uploadFile, uploadData };
