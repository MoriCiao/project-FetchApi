import React from "react";
import { getUrl } from "../../features/otherApi/otherSlice";
import { useDispatch, useSelector } from "react-redux";

const Select = ({}) => {
  const { link, currentURL } = useSelector((state: any) => state.otherApi);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center gap-2 md:flex-row">
      <label>請選擇想抓取的資料：</label>
      <select
        name="apiSelect"
        id="apiSelect"
        className="h-10 rounded-md border bg-white px-4 text-xl text-black md:h-auto md:px-8"
        value={currentURL}
        onChange={(e) => dispatch(getUrl(e.target.value))}
      >
        <option value=""></option>
        <option value={link.bike_url}>台北市即時 YouBike 站點資訊</option>
        <option value={link.weather_url}>Open-Meteo 地區溫度</option>
      </select>
    </div>
  );
};

export default Select;
