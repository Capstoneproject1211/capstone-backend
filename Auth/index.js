const passport = require("passport");
const User = require("../models/user");

//Serialize user with passport using hes/her email
passport.serializeUser((email, done)=> { 
  done(null, email);
});

//Deserialize user with passport using hes/her email
passport.deserializeUser((email, done)=> {
  done(null, email);
});

//Requiring Login - Register strategy files
const LoginStrategy = require("./LoginStrategy");
const RegisterStrategy = require("./RegisterStrategy");
const PasswordStrategy = require("./PasswordStrategy");
//Using the above
passport.use("local-login", LoginStrategy);
passport.use("local-register", RegisterStrategy);

module.exports = passport;
