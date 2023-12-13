const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    id: String,
    role: String,
    email: String,
    password: String,
    first_name: String,
    last_name: String,
  },
  {
    collection: "users",
  }
);
UserSchema.plugin(passportLocalMongoose);
const User = mongoose.model("users", UserSchema);

module.exports = User;
