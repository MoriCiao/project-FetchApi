import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  APIkey: "",
  isAuth: false,
  data: [],
  favorites: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    getApi(state, action) {
      const apikey = action.payload;
      console.log(apikey);
      return state;
    },
  },
});

export const { getApi } = searchSlice.actions;

export default searchSlice.reducer;
