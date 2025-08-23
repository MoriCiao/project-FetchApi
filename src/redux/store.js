import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../features/search/searchSlice";
import otherApiReducer from "../features/otherApi/otherSlice";
export const store = configureStore({
  reducer: {
    search: searchReducer,
    otherApi: otherApiReducer,
  },
});
