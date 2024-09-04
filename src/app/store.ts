import { configureStore } from "@reduxjs/toolkit";
import getUsersSlice from "./features/getUsers/getUsersSlice";

export const store = configureStore({
  reducer: { getUsers: getUsersSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
