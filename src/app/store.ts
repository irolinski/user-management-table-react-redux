import { configureStore } from "@reduxjs/toolkit";
import getUsersSlice from "./features/getUsersSlice";
import searchSlice from "./features/searchSlice";
import tableOptions from "./features/tableOptions";
import paginateTableSlice from "./features/paginateTableSlice";
import tableStyle from "./features/tableStyle";

export const store = configureStore({
  reducer: {
    getUsers: getUsersSlice,
    search: searchSlice,
    paginateTable: paginateTableSlice,
    tableOptions: tableOptions,
    tableStyle: tableStyle,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
