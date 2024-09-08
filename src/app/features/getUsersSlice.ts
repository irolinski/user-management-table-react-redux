import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_arg, { rejectWithValue }) => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!res.ok) {
      return rejectWithValue({
        status: res.status,
        message: await res.text(),
      });
    }
    return res.json();
  }
);

const getUsersSlice = createSlice({
  name: "getUsers",
  initialState: {
    isLoading: false,
    data: [],
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export default getUsersSlice.reducer;
