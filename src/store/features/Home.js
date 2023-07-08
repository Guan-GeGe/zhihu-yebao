import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { queryNewsLatest } from "@/service/home/home";

// 请求接口
export const feachHomeData = createAsyncThunk(
  "homedata",
  (payload, { dispatch, getState }) => {
    console.log(getState());
    queryNewsLatest().then((res) => {
      dispatch(changeNewsLatst(res));
    });
  }
);
const userListSlice = createSlice({
  name: "home",
  initialState: {
    NewsLatst: [],
  },
  reducers: {
    changeNewsLatst(state, { payload }) {
      console.log(state, payload);
      state.NewsLatst = payload.data;
    },
  },
});
export const { changeNewsLatst } = userListSlice.actions;
export default userListSlice.reducer;
