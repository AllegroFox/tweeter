"use strict";

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  //We have a connection to the "tweeter" db, starting here:
  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  // refactored and wrapped as a new tweet-specific function:
  function getTweets(callback) {
    db.collection("tweets").find().toArray((err, tweets) => {
      if (err) {
        return callback(err);
      }
      callback(null, tweets);
    });
  }
  // can now be invoked. Even if you pass `getTweets` to another scope,
  // it still has closure over `db`, so it will still work.
  getTweets((err, tweets) => {
    if (err) throw err;

    console.log("Logging each tweet:");
    for (let tweet of tweets) {
      console.log(tweet);
    }
    //end of program:
    db.close();

  });
});