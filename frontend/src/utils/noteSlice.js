import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "./userSlice";

//fetcing notes information
export const fetchNotes = createAsyncThunk("note/fetchNotes", async () => {
    const userInfo = JSON.parse(localStorage?.getItem("userInfo"));
    const token = userInfo ? userInfo.token : "";

  const noteList = await fetch("http://localhost:5000/api/notes", {
    method: "GET",
    headers: {
      "content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const json = await noteList.json();
  const list = json.data;
  return list;
});

const noteSlice = createSlice({
  name: "note",
  initialState: {
    notes: [],
  },
  reducers: {
    addNotes: (state, action) => {
      state.notes = action.payload;
    },
    createNote:(state,action)=>{
        state.notes = [...state.notes,action.payload]
    },
    updateNote:(state,action)=>{
        const {_id} = action.payload
        state.notes = state.notes.map((n)=>n._id === _id ? action.payload : n )        
    },
    deleteNote:(state,action)=>{
        const {_id} = action.payload
        state.notes = state.notes.filter((n)=>n._id !== _id)        
    },
    clearNotes: (state, action) => {
      state.notes = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotes.fulfilled, (state, action) => {
      state.notes = action.payload;
    });
  },
});

export const { addNotes, createNote, clearNotes,updateNote, deleteNote} = noteSlice.actions;
export default noteSlice.reducer;
