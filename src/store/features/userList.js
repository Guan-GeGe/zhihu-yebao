import { createSlice } from "@reduxjs/toolkit";

const userListSlice = createSlice({
  name: "userList",
  initialState: {
    list: 1,
  },
  reducers: {
    addToList(state, action) {
      state.list = action.payload;
    },
  },
});
export const { addToList } = userListSlice.actions;
export default userListSlice.reducer;
