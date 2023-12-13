const mongoose = require("mongoose");
const { Schema } = mongoose;

const recipeCommentSchema = new Schema({
  submitted_by: String,
  submitted_email: String,
  submitted_on: String,
  comment_text: String,
  timeStamp: Date,
});
RecipeComment = mongoose.model("RecipeComments", recipeCommentSchema);
module.exports = {RecipeComment};
