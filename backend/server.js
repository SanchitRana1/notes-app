const express = require("express");
const app = express();
const notes = require("./data/notes");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000; //getting port
const mongoose = require("mongoose");
const userRoutes = require("./Routes/userRoutes");
const noteRoutes = require("./Routes/noteRoutes");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.json()); // whenever accepting json data from user
app.use(bodyParser.json());
app.use(cors());

dotenv.config();
connectDB(); //to connect to MONGO DB

app.get("/", (req, res) => {
  res.send("API is Running");
});

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
