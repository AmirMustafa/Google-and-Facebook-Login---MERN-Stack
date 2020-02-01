const mongoose = require("mongoose"); // this is schema page, we will use this at the time of db insert/fetch/delete etc
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userId: String, // googleId or facebookId
  username: String,
  picture: String
});

mongoose.model("users", userSchema); // setting Schema
