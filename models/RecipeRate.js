const mongoose = require("mongoose");
const { Schema } = mongoose;

const recipeRateSchema = new Schema({
  submitted_on: String,
  rating: String,
  timeStamp: Date,
});
RecipeRate = mongoose.model("RecipeRates", recipeRateSchema);
module.exports = {RecipeRate};