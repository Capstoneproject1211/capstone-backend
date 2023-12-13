const express = require("express");
const app = express();
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const { Bremos } = require("./models/ContactSchema");
const { Comment } = require("./models/Comments");
const { RecipeComment } = require("./models/RecipeComments");
const passport = require("./Auth");
const path = require("path");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
require("dotenv").config();
app.use(logger("dev"));
app.use(cors());

mongoose.connect(process.env.mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(cookieParser());
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.mongoDB_secret,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/logout", (req, res) => {
  req.logout();
  res.sendStatus(200);
});

const Authentication = require("./routes/Auth");
const User = require("./routes/User");
const Blogs = require("./routes/blog");
const Recipes = require("./routes/recipe");
app.use("/auth", Authentication);
app.use("/user", User);
app.use("/blogs", Blogs);
app.use("/recipes", Recipes);
app.get("/get-data/", (req, res) => {
  Bremos.find({}, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/build/index.html"));
});
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "/build/index.html"));
});
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/build/index.html"));
});
app.post("/contact-users", (req, res) => {
  const note = new Bremos({
    name: req.body.name,
    l_name: req.body.l_name,
    email: req.body.email,
    phone: req.body.phone,
    message: req.body.message,
    pref: req.body.pref,
    timeStamp: new Date(),
  });
  note
    .save()
    .then((item) => {
      res.send(
        "Your Query has Reached us Sucessfully , We'll get back to you Soon. "
      );
    })
    .catch((err) => {
      res.send(err);
    });
});
app.get("/get-comments/:id", (req, res) => {
  const param_id = req.params.id;
  Comment.find({ submitted_on: param_id }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
});
app.post("/store-comments", (req, res) => {
  console.log(req.body);
  const note = new Comment({
    submitted_by: req.body.submitted_by,
    submitted_email: req.body.submitted_email,
    submitted_on: req.body.submitted_on,
    comment_text: req.body.comment_text,
    timeStamp: new Date(),
  });
  note
    .save()
    .then((item) => {
      res.send(
        "Your Query has Reached us Sucessfully , We'll get back to you Soon. "
      );
    })
    .catch((err) => {
      res.send(err);
    });
});
app.get("/get-recipe-comments/:id", (req, res) => {
  const param_id = req.params.id;
  RecipeComment.find({ submitted_on: param_id }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
});
app.post("/store-recipe-comments", (req, res) => {
  console.log(req.body);
  const note = new RecipeComment({
    submitted_by: req.body.submitted_by,
    submitted_email: req.body.submitted_email,
    submitted_on: req.body.submitted_on,
    comment_text: req.body.comment_text,
    timeStamp: new Date(),
  });
  note
    .save()
    .then((item) => {
      res.send(
        "Your Query has Reached us Sucessfully , We'll get back to you Soon. "
      );
    })
    .catch((err) => {
      res.send(err);
    });
});

app.post("/contact-users", (req, res) => {
  const note = new Bremos({
    name: req.body.name,
    l_name: req.body.l_name,
    email: req.body.email,
    phone: req.body.phone,
    message: req.body.message,
    pref: req.body.pref,
    timeStamp: new Date(),
  });

  note
    .save()
    .then((item) => {
      res.send(
        "Your Query has Reached us Sucessfully , We'll get back to you Soon. "
      );
    })
    .catch((err) => {
      res.send(err);
    });
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.clear();
  console.log(`Central Recipe Generator listening on port ${port}!`);
});

app.use("/assets/", express.static(__dirname + "/images/"));
app.use("/static/", express.static(__dirname + "/build/static"));
app.use("/", express.static(__dirname + "/build/"));
app.use("/manifest.json", express.static(__dirname + "/build/manifest.json"));