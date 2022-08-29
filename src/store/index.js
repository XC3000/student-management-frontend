import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { modalSlice } from "./slices/modal";
import { studentSlice } from "./slices/student";

const rootReducer = combineReducers({
  students: studentSlice.reducer,
  modal: modalSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
