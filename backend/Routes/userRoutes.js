const express = require("express");
const { registerUser } = require("../controller/userControllers");
const userRoutes = express.Router();

userRoutes.route("/").post(registerUser);

module.exports = userRoutes;
