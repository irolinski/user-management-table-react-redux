import { configureStore } from "@reduxjs/toolkit";
import getUsersSlice from "./features/getUsers/getUsersSlice";
import searchSlice from "./features/Search/searchSlice";

export const store = configureStore({
  reducer: { getUsers: getUsersSlice, search: searchSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
