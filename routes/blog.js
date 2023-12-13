const Blogs = require("../models/BlogSchema");
const express = require("express");
const blogFunc = express();
blogFunc.get("/get-blogs", (req, res) => {
  Blogs.find({}, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
});
blogFunc.post("/post-blog", (req, res) => {
  const note = new Blogs({
    name: req.body.name,
    l_name: req.body.l_name,
    title: req.body.title,
    short_desc: req.body.short_desc,
    tags: req.body.tags,
    image_link: req.body.image_link,
    content: req.body.content,
    timeStamp: new Date(),
  });

  note
    .save()
    .then((item) => {
      res.send("Blog Posted Successfully");
    })
    .catch((err) => {
      console.log(err);
    });
});
blogFunc.delete("/delete-blog/:id", (req, res) => {
  Blogs.deleteOne({ _id: req.params.id })
    .then(function () {
      console.log("Data deleted");
    })
    .catch(function (error) {
      console.log(error);
    });
});
blogFunc.post("/update-blog/:id", (req, res) => {
  Blogs.findOne({ _id: req.params.id }, (err, data) => {
    if (!err) {
      const note = new Blogs({
        name: req.body.name,
        l_name: req.body.l_name,
        title: req.body.title,
        short_desc: req.body.short_desc,
        tags: req.body.tags,
        image_link: req.body.image_link,
        content: req.body.content,
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
module.exports = blogFunc;
