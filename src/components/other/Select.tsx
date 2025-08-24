
import React from 'react'
import { getUrl} from "../../features/otherApi/otherSlice"
import { useDispatch, useSelector } from 'react-redux'



const Select = ({ }) => {
    const { link } = useSelector((state: any) => state.otherApi)

    const dispatch = useDispatch()
  return (
    <div className='border border-white flex gap-2 p-4'>
        <label>請選擇想抓取的資料：</label>
        <select name="apiSelect" id="apiSelect" className='border  rounded-md bg-white text-black px-8' onChange={(e)=> dispatch(getUrl(e.target.value))}>
            <option value=""></option>
            <option value={link.bike_url}>台北市即時 YouBike 站點資訊</option>
            <option value={link.weather_url}>Open-Meteo 天氣預報</option>
        </select>    
    </div>

    )   
}

export default Select