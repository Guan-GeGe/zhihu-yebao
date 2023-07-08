import { configureStore } from "@reduxjs/toolkit";
import userListReducer from "./features/userList";
import HomeReducer from "./features/Home";
import InfoReducer from "./features/Info";
import StoreReducer from "./features/Store";
const store = configureStore({
  reducer: {
    userList: userListReducer,
    home: HomeReducer,
    infoData: InfoReducer,
    StoreData: StoreReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
