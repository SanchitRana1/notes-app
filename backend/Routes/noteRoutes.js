const express = require("express");
const {
  getNotes,
  createNote,
  getNoteById,
  updateNoteById,
  deleteNoteById,
} = require("../controller/noteControllers");
const { protect } = require("../middlewares/authMiddleware");
const noteRouter = express.Router();

noteRouter.route("/").get(protect, getNotes);
noteRouter.route("/create").post(protect, createNote);
noteRouter
  .route("/:id")
  .get(protect, getNoteById)
  .put(protect, updateNoteById)
  .delete(protect, deleteNoteById);

module.exports = noteRouter;
