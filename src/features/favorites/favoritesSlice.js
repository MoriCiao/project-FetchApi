// favoritesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fav_list: [],
};

const favSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFav(state, action) {
      const item = action.payload;
      return { ...state, fav_list: [...state.fav_list, item] };
    },
    removeFav(state, action) {
      const select = action.payload;
      const updateList = fav_list.filter((item) => {
        item.id !== select.id;
      });
      return { ...state, fav_list: updateList };
    },
  },
});

export const {} = favSlice;

export default favSlice.reducer;
