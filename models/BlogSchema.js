const mongoose = require("mongoose");
const { Schema } = mongoose;

const BlogSchema = new Schema({
  name: String,
  l_name: String,
  title: String,
  short_desc: String,
  tags: String,
  image_link: String,
  content: String,
  timeStamp: Date,
});
Blogs = mongoose.model("Blogs", BlogSchema);
module.exports = Blogs;
