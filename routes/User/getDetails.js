const express = require("express");
const getDetails = express.Router();
const User = require("../../models/user");
getDetails.get("/getDetails", (req, res) => {
  console.log(req.isAuthenticated());
  User.findOne(
    { email: req.session.passport.user.email },
    function (err, user) {
      if (err) console.log(err);

      const { first_name, last_name, role, email, allergy_info, password } =
        user;
      res.status(200).send({
        first_name,
        last_name,
        role,
        email,
        allergy_info,
        password,
      });
    }
  );
});
getDetails.post("/setDetails", (req, res) => {
  User.findOne(
    { email: req.session.passport.user.email },
    function (err, user) {  
      if (err) console.log(err);
      const note = new User({
        role: req.body.role,
        email: req.body.email,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        allergy_info: req.body.allergy_info,
      });
      user.remove();
      note.save();
      res.sendStatus(200);
    }
  );
});

module.exports = getDetails;
