import { createSlice } from "@reduxjs/toolkit";
import React from "react";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: JSON.parse(localStorage.getItem("userInfo")),
    loading: false,
  },
  reducers: {
    addUser: (state, action) => {
      state.userInfo = action.payload;
    },
    removeUser: (state, action) => {
      state.userInfo = null;
    },
    updateUser:(state,action)=>{
      state.userInfo = action.payload        
  },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { addUser, setLoading, removeUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
