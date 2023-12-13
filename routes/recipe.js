const Recipes = require("../models/RecipeSchema");
const express = require("express");
const recipeFunc = express();
recipeFunc.get("/get-recipes", (req, res) => {
  Recipes.find({}, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
});
recipeFunc.post("/search/:query", async (req, res) => {
  const query = req.params.query;
  console.log(query);
  const results = await Recipes.find({});
  res.json(results);
});
recipeFunc.post("/add-recipe", (req, res) => {
  const note = new Recipes({
    title: req.body.title,
    short_desc: req.body.short_desc,
    tags: req.body.tags,
    image_link: req.body.image_link,
    allergy_info: req.body.allergy_info,
    method: req.body.method,
    ingredients: req.body.ingredients,
    timeStamp: new Date(),
  });

  note
    .save()
    .then((item) => {
      res.send("Recipe Added Successfully");
    })
    .catch((err) => {
      console.log(err);
    });
});
recipeFunc.delete("/delete-recipe/:id", (req, res) => {
  Recipes.deleteOne({ _id: req.params.id })
    .then(function () {
      console.log("Data deleted");
    })
    .catch(function (error) {
      console.log(error);
    });
});
recipeFunc.post("/update-blog/:id", (req, res) => {
  Recipes.findOne({ _id: req.params.id }, (err, data) => {
    if (!err) {
      const note = new Recipes({
        title: req.body.title,
        short_desc: req.body.short_desc,
        tags: req.body.tags,
        image_link: req.body.image_link,
        allergy_info: req.body.allergy_info,
        method: req.body.method,
        ingredients: req.body.ingredients,
        timeStamp: new Date(),
      });
      data.remove();
      note.save();
      res.end();
    } else {
      console.log(err);
    }
  });
});

module.exports = recipeFunc;
