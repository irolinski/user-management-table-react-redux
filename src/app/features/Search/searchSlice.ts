import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    name: "",
    username: "",
    email: "",
    phone: "",
  },
  reducers: {
    searchByName: (state, action) => {
      state.name = action.payload;
    },
    searchByUsername: (state, action) => {
      state.username = action.payload;
    },
    searchByEmail: (state, action) => {
      state.email = action.payload;
    },
    searchByPhone: (state, action) => {
      state.phone = action.payload;
    },
  },
});

export const { searchByName, searchByUsername, searchByEmail, searchByPhone } =
  searchSlice.actions;

export default searchSlice.reducer;
