const express = require("express");
const { registerUser, loginUser } = require("../controller/userControllers");
const userRouter = express.Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);

module.exports = userRouter;
