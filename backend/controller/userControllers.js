const asyncHandler = require("express-async-handler");
const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

const registerUser = async (req, res) => {
  const { name, email, password, pic } = req.body;

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
      pic,
    });
    if (user) {
      res.status(201).json({
        data: {
          id: user._id,
          name: user.name,
          isAdmin: user.isAdmin,
          email: user.email,
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
  console.log("email :" + email);
  const user = await User.findOne({ email: email });
  console.log(user);
  const hashpass = user?.password;

  if (user) {
    bcrypt.compare(password, hashpass, (err, result) => {
      if (err) {
        res.status(400).json("Error comparing passwords");
      }

      if (result) {
        // Passwords match, authentication successful
        res.status(201).json({
          result: "Passwords match! User authenticated.",
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
    res.status(400).json({ result: "User does not exists !" });
  }
};
module.exports = { registerUser, loginUser };
