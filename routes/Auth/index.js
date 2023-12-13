const express = require("express");
const Authentication = express.Router();

const Login = require("./login");
const Register = require("./register");
const ChangePass = require("./changePass");

Authentication.use("", Login, Register,ChangePass);

module.exports = Authentication;
