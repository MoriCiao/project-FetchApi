// favoritesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentURL: "",
  data: [],
  loading: false,
};

const otherSlice = createSlice({
  name: "otherApi",
  initialState,
  reducers: {
    getUrl(state, action) {
      console.log(action.payload);
      state.currentURL = action.payload;
      // 選擇對應的連結後  loading - 抓取之廖
    },

    updateData(state, action) {
      state.data = action.payload;
    },
  },
});

export const { getUrl, updateData } = otherSlice.actions;

export default otherSlice.reducer;
