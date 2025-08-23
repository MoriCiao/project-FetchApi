import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  keyword: "",
  APIkey: "",
  isAuth: false,
  data: [],
  isLoading: false,
  openFav: false,
  favorites: [],
  initialURL: "https://api.pexels.com/v1/curated?per_page=16&page=1",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    handleApi(state, action) {
      state.APIkey = action.payload;
    },
    allowApi(state, action) {
      state.isAuth = action.payload;
    },
    searchData(state, action) {},
    getData(state, action) {
      state.isAuth = true;
      state.data = action.payload;
    },
    moreData(state, action) {
      state.data = [...state.data, ...action.payload];
    },
    toggleFav(state, action) {
      state.openFav = action.payload;
    },
    searchKeyword(state, action) {
      state.keyword = action.payload;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    isLike(state, action) {
      const item = action.payload;
      const exists = state.favorites.some((f) => f.id === item.id);
      let updateData;

      if (exists) {
        updateData = state.favorites.filter((f) => f.id !== item.id);
      } else {
        updateData = [...state.favorites, item];
      }
      return { ...state, favorites: updateData };
    },
    allClean(state, action) {
      state.favorites = [];
    },
  },
});

export const {
  handleApi,
  allowApi,
  getData,
  moreData,
  toggleFav,
  searchKeyword,
  setLoading,
  isLike,
  allClean,
} = searchSlice.actions;

export default searchSlice.reducer;
