import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { queryStoreList } from "@/service/home/home";

// 请求接口
export const feachStoreData = createAsyncThunk(
  "storedata",
  async (payload, { dispatch, getState }) => {
    // console.log(getState());
    try {
      const res = await queryStoreList();
      dispatch(changeQueryStore(res.data.data));
      return res.data.data;
    } catch (error) {
      // 处理错误情况
      console.error(error);
    }
  }
);
const feachStoreSlice = createSlice({
  name: "StoreData",
  initialState: {
    Store: null,
  },
  reducers: {
    changeQueryStore(state, { payload }) {
      // console.log(state, payload);
      state.Store = payload;
    },
    clearStore(state, { payload }) {
      console.log("清空数据");
      state.Store = null;
    },
  },
  extraReducers: {
    // [feachInfoData.fulfilled]: (state, { payload }) => {
    //   console.log(payload);
    //   state.Info = payload;
    // },
  },
});

export const { changeQueryStore, clearStore } = feachStoreSlice.actions;
export default feachStoreSlice.reducer;
