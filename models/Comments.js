const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
  submitted_by: String,
  submitted_email: String,
  submitted_on: String,
  comment_text: String,
  timeStamp: Date,
});
Comment = mongoose.model("Comments", commentSchema);
module.exports = {Comment};
