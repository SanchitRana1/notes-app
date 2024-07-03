const express = require("express");
const { registerUser, loginUser, updateUserProfile } = require("../controller/userControllers");
const { protect } = require("../middlewares/authMiddleware");
const userRouter = express.Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/profile").post(protect,updateUserProfile);

module.exports = userRouter;
