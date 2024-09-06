import { createSlice } from "@reduxjs/toolkit";

const paginateSlice = createSlice({
  name: "paginate",
  initialState: {
    resultsPerPage: 5,
    displayedPage: 1,
  },
  reducers: {
    setResutltsPerPage: (state, action) => {
      state.resultsPerPage = action.payload;
    },
    setDisplayedPage: (state, action) => {
      state.displayedPage = action.payload;
    },
  },
});

export const { setResutltsPerPage, setDisplayedPage } = paginateSlice.actions;
export default paginateSlice.reducer;
