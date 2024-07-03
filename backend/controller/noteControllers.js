const expressAsyncHandler = require("express-async-handler");
const Note = require("../models/noteModel");
const getNotes = expressAsyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user._id });
  if (notes) {
    res
      .status(201)
      .json({ data: notes, result: "Notes fetched", status: "success" });
  } else {
    res.status(401).json({ result: "No notes found", status: "error" });
  }
});

const createNote = expressAsyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  if (!title || !content || !category) {
    res
      .status(401)
      .json({ result: "Please fill all the fields", status: "error" });
  } else {
    var note = new Note({ user: req.user._id, title, content, category });
    const createdNote = await note.save();
    res.status(201).json({
      result: "Note created successfully !",
      data: createdNote,
      status: "success",
    });
  }
});

const getNoteById = expressAsyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (note) {
    res
      .status(201)
      .json({ result: "Edit selected note", data: note, status: "success" });
  } else {
    res.status(401).json({ result: "Note not found", status: "error" });
  }
});

const updateNoteById = expressAsyncHandler(async (req, res) => {
  const { title, content, category } = req.body;
  const note = await Note.findById(req.params.id);
  if (note.user.toString() !== req.user._id.toString()) {
    res
      .status(401)
      .json({ result: "You can't perform this action !", status: "error" });
  }

  if (note) {
    note.title = title;
    note.content = content;
    note.category = category;
    const updatedNote = await note.save();
    res.status(201).json({
      result: "Note updated successfully",
      status: "success",
      data: updatedNote,
    });
  } else {
    res.status(401).json({ result: "Note not found", status: "error" });
  }
});

const deleteNoteById = expressAsyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (note.user.toString() !== req.user._id.toString()) {
    res
      .status(401)
      .json({ result: "You can't perform this action !", status: "error" });
  }
  if (note) {
    await note.deleteOne();
    res.status(201).json({
      result: "Note deleted successfully",
      status: "success",
      data: note,
    });
  } else {
    res.status(401).json({ result: "Note not found", status: "error" });
  }
});
module.exports = {
  getNotes,
  createNote,
  getNoteById,
  updateNoteById,
  deleteNoteById,
};
