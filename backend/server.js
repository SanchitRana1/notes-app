const express = require("express");
const app = express();
const notes = require("./data/notes");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 5000; //getting port

app.get("/", (req, res) => {
  res.send("API is Running");
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
  console.log(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const { id } = req.params;
  const note = notes.find((n) => n._id === id);
  res.json(note);
});

app.listen(PORT, () => {
  console.log("Listening to port " + PORT);
});
