import { createSlice } from "@reduxjs/toolkit";

const standardizeSlice = createSlice({
  name: "standardize",
  initialState: { isActive: false },
  reducers: {
    toggleStandardize: (state) => {
      state.isActive = !state.isActive;
    },
  },
});

export const { toggleStandardize } = standardizeSlice.actions;
export default standardizeSlice.reducer;
