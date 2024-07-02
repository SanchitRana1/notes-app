import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import noteSlice from "./noteSlice";

const appStore = configureStore({
  reducer: {
    user: userSlice,
    note: noteSlice,
  },
});

export default appStore;
