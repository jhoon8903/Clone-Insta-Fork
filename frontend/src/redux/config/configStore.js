// src/redux/config/configStore.js
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import postDetailSlice from "../modules/postDetailSlice";
import loginSlice from "../modules/loginSlice";
import signUpSlice from "../modules/signUpSlice";

const store = configureStore({
  reducer: {
    postDetailSlice,
    loginSlice,
    signUpSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
