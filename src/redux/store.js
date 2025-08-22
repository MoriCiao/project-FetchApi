import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../features/search/searchSlice";
import otherApi from "../features/otherApi/otherSlice";
export const store = configureStore({
  reducer: {
    search: searchReducer,
    otherApi: otherApi,
  },
});
