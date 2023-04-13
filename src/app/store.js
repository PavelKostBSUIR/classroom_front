import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../redux/common/apiSlice";
import authReducer from "../redux/auth/authSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
