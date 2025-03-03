import { configureStore } from "@reduxjs/toolkit";
import { taskApi } from "../Slice/productApi";

export const store = configureStore({
  reducer: {
    [taskApi.reducerPath]: taskApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(taskApi.middleware),
});
