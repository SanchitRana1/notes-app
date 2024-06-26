import { createSlice } from "@reduxjs/toolkit";
import React from "react";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
    loading: false,
  },
  reducers: {
    addUser: (state, action) => {
      state.userInfo = action.payload;
    },
    removeUser: (state, action) => {
      state.userInfo = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { addUser, setLoading, removeUser } = userSlice.actions;
export default userSlice.reducer;
