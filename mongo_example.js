"use strict";

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  // ==> We have a connection to the "tweeter" db,
  //     starting here.
  console.log(`Connected to mongodb: ${MONGODB_URI}`);



    //end of program:
    db.close();

});