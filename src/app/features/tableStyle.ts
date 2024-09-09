import { createSlice } from "@reduxjs/toolkit";

const tableStyle = createSlice({
  name: "tableStyle",
  initialState: { headerOffset: 0 },
  reducers: {
    setHeaderOffset: (state, action) => {
      state.headerOffset = action.payload;
    },
  },
});

export const { setHeaderOffset } = tableStyle.actions;
export default tableStyle.reducer;
