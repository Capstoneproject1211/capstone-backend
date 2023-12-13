const express = require("express");
const getDetails = express.Router();
const User = require("../../models/user");
getDetails.get("/getDetails", (req, res) => {
  console.log(req.isAuthenticated())
  User.findOne(
    { email: req.session.passport.user.email },
    function (err, user) {
      if (err) console.log(err);

      const { first_name, last_name , role } = user;

      res.status(200).send({
        first_name,
        last_name,
        role,
      });
    }
  );
});

module.exports = getDetails;
