const express = require("express");
const app = express();
const notes = require("./data/notes");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
dotenv.config();
const PORT = process.env.PORT || 5000; //getting port
const mongoose = require("mongoose");
const userRoutes = require("./Routes/userRoutes");

connectDB(); //to connect to MONGO DB
app.use(express.json()); // whenever accepting json data from user

app.get("/", (req, res) => {
  res.send("API is Running");
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const { id } = req.params;
  const note = notes.find((n) => n._id === id);
  res.json(note);
});

app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     // confirm if app is connect to db
//     console.log("App connected to DB");
//     //listen only if app is connected
//   })
//   .catch((err) => {
//     console.log(err);
//   });
