const User = require("../models/user");
const passport = require('passport')
passport.use(User.createStrategy());
passport.serializeUser((email, done) => {
  done(null, email);
});
passport.deserializeUser((email, done) => {
  User.findById(email, (err, user) => {
    done(err, user);
  });
});
