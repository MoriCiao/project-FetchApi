
import React from 'react'
import { getUrl} from "../../features/otherApi/otherSlice"
import { useDispatch } from 'react-redux'



const Select = ({}) => {
    const bike_url = "https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json"
    const weather_url = "https://api.open-meteo.com/v1/forecast?latitude=25.0&longitude=121.3&hourly=temperature_2m"

    const dispatch = useDispatch()
  return (
    <div className='border border-white flex gap-2 text-white p-4'>
        <label>請選擇想抓取的資料：</label>
        <select name="apiSelect" id="apiSelect" className='bg-white text-black px-8' onChange={(e)=> dispatch(getUrl(e.target.value))}>
            <option value=""></option>
            <option value={bike_url}>即時 YouBike 站點資訊</option>
            <option value={weather_url}>Open-Meteo 天氣預報</option>
        </select>    
    </div>

    )   
}

export default Select