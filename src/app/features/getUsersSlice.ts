import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("fetchUsers", async () => {
  const data = await fetch("https://jsonplaceholder.typicode.com/users");
  return data.json();
});

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
        state.error = true;
      });
  },
});

export default getUsersSlice.reducer;
