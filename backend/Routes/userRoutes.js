const express = require("express");
const { registerUser, loginUser } = require("../controller/userControllers");
const userRoutes = express.Router();

userRoutes.route("/register").post(registerUser);
userRoutes.route("/login").post(loginUser);

module.exports = userRoutes;
