const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_DB_URL;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connect = async () => {
  try {
    await client.connect();
    // await client.db("kosh_metadata_store").command({ ping: 1 });
    console.log("Success : connected to metadata store");
  } catch (err) {
    console.log(err);
    console.log("Error : could not connect to mongo");
    process.exit();
  }
};

const store = async (dbName, collectionName, data) => {
  try {
    const result = await client
      .db(dbName)
      .collection(collectionName)
      .insertOne(data);
  } catch (err) {
    console.log(`Error : could not store in Mongo ${err}`);
    throw err;
  }
};

const update = async (dbName, collectionName, filter, updateDoc) => {
  try {
    const options = { upsert: true };
    await client
      .db(dbName)
      .collection(collectionName)
      .updateOne(filter, updateDoc, options);
  } catch (err) {
    console.log("Error : Could not update data");
    throw err;
  }
};

const get = async (dbName, collectionName, condition, options) => {
  try {
    const result = await client
      .db(dbName)
      .collection(collectionName)
      .find(condition)
      .limit(options.limit)
      .skip(options.skip);
    return result;
  } catch (err) {
    console.log(`Error : could not retrieve data from mongo`);
    console.log(err);
    throw err;
  }
};

const getOne = async (dbName, collectionName, condition) => {
  try {
    const result = await client
      .db(dbName)
      .collection(collectionName)
      .findOne(condition);

    return result;
  } catch (err) {
    console.log(`Error : could not retrieve data from mongo`);
    console.log(err);
    throw err;
  }
};

const get2 = async (dbName, collectionName, options) => {
  try {
    const result = await client
      .db(dbName)
      .collection(collectionName)
      .find({})
      .limit(100);
    return result;
  } catch (err) {
    console.log(`Error : could not retrieve data from mongo`);
    console.log(err);
    throw err;
  }
};

const count = async (dbName, collectionName, condition) => {
  try {
    const result = await client
      .db(dbName)
      .collection(collectionName)
      .find(condition)
      .count();
    return result;
  } catch (err) {
    console.log(`Error : could not count in mongo`);
    throw err;
  }
};

const bulkWrite = async (dbName, collectionName, operations) => {
  try {
    return await client
      .db(dbName)
      .collection(collectionName)
      .bulkWrite(operations);
  } catch (err) {
    console.log(`Error : could not bulkWrite in mongo`);
    throw err;
  }
};

module.exports = {
  connect,
  store,
  update,
  get,
  getOne,
  get2,
  count,
  bulkWrite,
};
