// favoritesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentURL: "",
  keyword: "",
  data: [],
  filtered: [],
  link: {
    bike_url:
      "https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json",
    weather_url:
      "https://api.open-meteo.com/v1/forecast?latitude=25.0&longitude=121.3&hourly=temperature_2m",
  },
};

const otherSlice = createSlice({
  name: "otherApi",
  initialState,
  reducers: {
    getUrl(state, action) {
      console.log(action.payload);
      state.currentURL = action.payload;
      // 選擇對應的連結後  loading - 抓取資料
    },

    updateData(state, action) {
      state.data = action.payload;
    },

    findData(state, action) {
      console.log(state.keyword);
      const filteredData = state.data.filter((d) => {
        return d.sarea.includes(state.keyword) || d.ar.includes(state.keyword);
      });
      return {
        ...state,
        keyword: action.payload,
        filtered: filteredData,
      };
    },
  },
});

export const { getUrl, updateData, findData } = otherSlice.actions;

export default otherSlice.reducer;
