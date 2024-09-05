import { configureStore } from "@reduxjs/toolkit";
import getUsersSlice from "./features/getUsersSlice";
import searchSlice from "./features/searchSlice";
import toggleStandardize from "./features/standardize";

export const store = configureStore({
  reducer: {
    getUsers: getUsersSlice,
    search: searchSlice,
    toggleStandardize: toggleStandardize,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
