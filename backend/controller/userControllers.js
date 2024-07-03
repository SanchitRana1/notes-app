const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const expressAsyncHandler = require("express-async-handler");

const registerUser = async (req, res) => {
  const { name, email, password, picMessage } = req.body;
  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res.status(400).json({ result: "User already exists.", status: "info" });
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    // console.log(hashedPassword);
    const user = await User.create({
      name,
      email,
      password: hashPassword,
      pic: picMessage,
    });
    if (user) {
      res.status(201).json({
        data: {
          id: user._id,
          name: user.name,
          isAdmin: user.isAdmin,
          email: user.email,
          pic: user.pic,
          token: generateToken(user._id),
        },
        status: "success",
        result: "User created successfully",
      });
    } else {
      res
        .status(400)
        .json({ result: "Error while creating user !", status: "error" });
      // throw new Error("User not created !");
    }
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  // console.log(user);
  const hashpass = user?.password;

  if (user) {
    bcrypt.compare(password, hashpass, (err, result) => {
      if (err) {
        res.status(400).json("Error comparing passwords");
      }

      if (result) {
        // Passwords match, authentication successful
        res.status(201).json({
          result: "Welcome back " + user.name,
          status: "success",
          data: {
            id: user._id,
            name: user.name,
            isAdmin: user.isAdmin,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
          },
        });
      } else {
        // Passwords don't match, authentication failed
        res.status(400).json({
          result: "Passwords do not match! Authentication failed.",
          status: "error",
        });
      }
    });
  } else {
    res.status(400).json({ result: "User does not exists !", status: "error" });
  }
};

const updateUserProfile = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  const { name, email, pic, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashPassword = password ? await bcrypt.hash(password, salt) : password;

  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;
    user.pic = pic || user.pic;
    user.password = password ? hashPassword : user.password;

    const updatedUser = await user.save();
    res.status(201).json({
      result: "User info updated",
      status: "success",
      data: {
        id: updatedUser._id,
        name: updatedUser.name,
        isAdmin: user.isAdmin,
        email: updatedUser.email,
        pic: updatedUser.pic,
        token: generateToken(updatedUser._id),
      },
    });
  } else {
    res.status(404).json({ result: "User does not exists !", status: "error" });
  }
});
module.exports = { registerUser, loginUser, updateUserProfile };
