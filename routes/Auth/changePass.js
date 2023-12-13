const express = require("express");
const changePass = express.Router();
const User = require("../../models/user");
changePass.post("/change-password", (req, res) => {
    console.log(req.body.email)
  User.findOne({ email: req.body.email }).then((user) => {
    user.changePassword(
      req.body.oldPassword,
      req.body.newPassword,
      function (err) {
        if (err) {
          console.log(err);
          res.status(500).send("An error occurred");
        } else {
          res.send("Password changed successfully");
        }
      }
    );
  });
});

module.exports = changePass;