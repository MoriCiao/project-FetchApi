// favoritesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentURL: "",
  keyword_Dis: "",
  keyword: "",
  data: [],
  filtered: [],
  link: {
    bike_url:
      "https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json",
    weather_url:
      "https://api.open-meteo.com/v1/forecast?latitude=25.0&longitude=121.3&hourly=temperature_2m",
  },
  statusApi: {
    isLoading: false,
    isDownload: false,
    isError: false,
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
    resetURL(state, action) {
      return { ...state, currentURL: "", data: [] };
    },
    updateData(state, action) {
      state.data = action.payload;
    },
    findDistrict(state, action) {
      const value = action.payload;
      const filterData = state.data.filter((d) => {
        return d.sarea.includes(value);
      });
      return {
        ...state,
        keyword: "",
        keyword_Dis: value,
        filtered: filterData,
      };
    },
    findAddress(state, action) {
      const keyword = action.payload.toLowerCase();
      const filteredData = state.data.filter((d) => {
        return d.ar.includes(keyword) && d.sarea.includes(state.keyword_Dis);
      });
      return {
        ...state,
        keyword: keyword,
        filtered: filteredData,
      };
    },
    resetKeyword(state, action) {
      return { ...state, keyword_Dis: "", keyword: "", filtered: [] };
    },
    setLoading(state, action) {
      state.statusApi.isLoading = action.payload;
    },
  },
});

export const {
  getUrl,
  resetURL,
  updateData,
  findDistrict,
  findAddress,
  setLoading,
} = otherSlice.actions;

export default otherSlice.reducer;
