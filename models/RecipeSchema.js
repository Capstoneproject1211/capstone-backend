const mongoose = require("mongoose");
const { Schema } = mongoose;

const RecipeSchema = new Schema({
  title: String,
  short_desc: String,
  tags: String,
  image_link: String,
  allergy_info: String, 
  method: String, 
  ingredients: Object,
  timeStamp: Date,
});
Recipes = mongoose.model("Recipes", RecipeSchema);
module.exports = Recipes;
