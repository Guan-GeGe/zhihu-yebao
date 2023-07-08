import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { queryUserInfo } from "@/service/home/home";

// 请求接口
export const feachInfoData = createAsyncThunk(
  "infodata",
  async (payload, { dispatch, getState }) => {
    // console.log(getState());
    try {
      const res = await queryUserInfo();
      dispatch(changeQueryInfo(res.data.data));
      return res.data.data;
    } catch (error) {
      // 处理错误情况
      console.error(error);
    }
  }
);
const feachInfoSlice = createSlice({
  name: "infoData",
  initialState: {
    Info: null,
  },
  reducers: {
    changeQueryInfo(state, { payload }) {
      // console.log(state, payload);
      state.Info = payload;
    },
    clearInfo(state) {
      state.Info = null;
    },
  },
  extraReducers: {
    // [feachInfoData.fulfilled]: (state, { payload }) => {
    //   console.log(payload);
    //   state.Info = payload;
    // },
  },
});

export const { changeQueryInfo, clearInfo } = feachInfoSlice.actions;
export default feachInfoSlice.reducer;
