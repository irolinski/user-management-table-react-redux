import { createSlice } from "@reduxjs/toolkit";

const tableOptions = createSlice({
  name: "tableOptions",
  initialState: { standardizeIsActive: true, showSearch: true },
  reducers: {
    toggleStandardize: (state) => {
      state.standardizeIsActive = !state.standardizeIsActive;
    },
    toggleSearch: (state) => {
      state.showSearch = !state.showSearch
    }
  },
});

export const { toggleStandardize, toggleSearch } = tableOptions.actions;
export default tableOptions.reducer;
