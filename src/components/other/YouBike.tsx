import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {findData} from "../../features/otherApi/otherSlice"
import KeywordInput from '../KeywordInput'
export default function YouBike() {
    const {data ,filtered ,link , currentURL ,keyword} = useSelector((state:any)=>state.otherApi)
    const isBike = link.bike_url === currentURL
    const dispatch= useDispatch()

    const currentData = keyword.trim() === "" ? data : filtered
    console.log(currentData.length)
  return (
    <div className='w-full flex flex-col gap-4 overflow-x-auto px-8 py-4'>
        <div className={`flex items-center justify-between`}>
            <KeywordInput 
                key={keyword} 
                placeholder="關鍵字..." 
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                    dispatch(findData(e.target.value))
                }}/>
            <p>目前已獲取 {currentData.length} 筆資料</p>
        </div>
    <table className='min-w-full table-fixed border-collapse'>
        <thead>
            <tr className='w-full bg-gray-500 text-white'>
                <th className={` py-2 px-4 border border-gray-900`}>編號</th>
                <th className={` py-2 px-4 border border-gray-900`}>地區</th>
                <th className={` py-2 px-4 border border-gray-900`}>地址</th>
                <th className={` py-2 px-4 border border-gray-900`}>已租借</th>
                <th className={` py-2 px-4 border border-gray-900`}>未租借</th>
                <th className={` py-2 px-4 border border-gray-900`}>總數量</th>
                <th className={` py-2 px-4 border border-gray-900`}>資料更新時間</th>
            </tr>
        </thead>
        <tbody>
            
            {Array.isArray(data) && isBike &&  currentData.map((d, index :number) :React.ReactNode=>{
                const displayIndex = index + 1
                return (
                    <tr key={displayIndex} className={`odd:hover:bg-gray-300 even:hover:bg-gray-500 even:hover:text-white transition-all duration-500 `}>
                        <th className={`py-2 px-4 border border-gray-900`}>{displayIndex}</th>
                        <th className={`py-2 px-4 border border-gray-900`}>{d.sarea}</th>
                        <th className={`py-2 px-4 border border-gray-900`}>{d.ar}</th>
                        <th className={`py-2 px-4 border border-gray-900`}>{d.available_rent_bikes}</th>
                        <th className={`py-2 px-4 border border-gray-900`}>{d.available_return_bikes}</th>
                        <th className={`py-2 px-4 border border-gray-900`}>{d.Quantity}</th>
                        <th className={`py-2 px-4 border border-gray-900`}>{d.srcUpdateTime}</th>
                    </tr>
                )
            })}
            
        </tbody>
    </table>
    
    
    </div>
  )
}
