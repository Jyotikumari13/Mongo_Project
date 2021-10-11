require("dotenv").config();
require("../../utility/constant");
const _l = require(`${PROJECT_DIR}/utility/userConsoleLogs`);
const qry = require(`${PROJECT_DIR}/utility/selectQueries`);
var response = { "status": 200, "response": "" };
const express = require('express');
const router = express.Router();
var info = {"message":"","error":[]};
var validation = require(`${PROJECT_DIR}/utility/validation`);
var dtUtil = require(`${PROJECT_DIR}/utility/dateUtility`);
const uuidv4 = require('uuid/v4');
const moment = require('moment');

const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'
module.exports = router;
// Connection URL
//const url = 'mongodb://127.0.0.1:27017/myProject';
var url=process.env.MONGO_URI.myProject;
console.log('?????????????????????????????????????????????',url);

// Database Name
const dbName = 'myProject';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('documents');
  const insertResult = await collection.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }]);
  console.log('Inserted documents =>', insertResult);

  // the following code examples can be pasted here...

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

