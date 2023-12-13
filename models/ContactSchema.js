const mongoose = require("mongoose");
const { Schema } = mongoose;

const ContactSchema = new Schema({
  name: String,
  l_name: String,
  email: String,
  phone: String,
  message: String,
  timeStamp: Date,
});
Bremos = mongoose.model("Contacts", ContactSchema);
module.exports = { Bremos };
