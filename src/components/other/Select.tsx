
import React from 'react'
import { getUrl} from "../../features/otherApi/otherSlice"
import { useDispatch, useSelector } from 'react-redux'

const Select = ({ }) => {
    const { link ,currentURL} = useSelector((state: any) => state.otherApi)
    const dispatch = useDispatch()

  return (
    <div className='flex md:flex-row flex-col items-center gap-2'>
        <label>請選擇想抓取的資料：</label>
        <select name="apiSelect" id="apiSelect" 
        className='border rounded-md bg-white text-black md:px-8 px-4 md:h-auto h-10 text-xl' 
        value={currentURL}
        onChange={(e)=>dispatch(getUrl(e.target.value))}>
            <option value=""></option>
            <option value={link.bike_url}>台北市即時 YouBike 站點資訊</option>
            <option value={link.weather_url}>Open-Meteo 地區溫度</option>
        </select>    
    </div>

    )   
}

export default Select