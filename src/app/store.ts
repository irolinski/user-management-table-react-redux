import { configureStore } from "@reduxjs/toolkit";
import getUsersSlice from "./features/getUsersSlice";
import searchSlice from "./features/searchSlice";
import tableOptions from "./features/tableOptions";

export const store = configureStore({
  reducer: {
    getUsers: getUsersSlice,
    search: searchSlice,
    tableOptions: tableOptions,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
