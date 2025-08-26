import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { findDistrict, findAddress } from "../../features/otherApi/otherSlice"
import KeywordInput from '../KeywordInput'
import Pagination from './Pagination'
import Select from './select'
import Button from '../Button'

const data_per_page = 20

export default function YouBike() {
    const {data ,filtered ,link , currentURL , keyword_Dis, keyword} = useSelector((state:any)=>state.otherApi)
    const isBike = link.bike_url === currentURL
    const dispatch= useDispatch()

    const currentData = (keyword.trim() === "" && keyword_Dis === "") ? (data || []) : (filtered || []) 

    const [currentPage, setCurrentPage] = useState(1)
    const totalPage = Math.ceil( currentData.length / data_per_page)
    const startIndex = (currentPage - 1) * data_per_page
    const endIndex =  startIndex + data_per_page
    const CurrentItems = currentData.slice(startIndex, endIndex)

    function findDis(obj){
        let result = data.reduce((acc, cur) => {
            acc[cur.sarea] = (acc[cur.sarea] || 0 ) +1
            return acc
        },{})
        return Object.entries(result)
    }
    useEffect(()=>{
        setCurrentPage(1)
    },[currentURL, keyword])

   
    
  return (
    <div className='w-full flex flex-col gap-4 overflow-x-auto px-8 py-4'>
        <div className={`flex items-center justify-between h-10`}>
            <div className='h-full flex gap-4'>
            <select name="" id="" className='bg-gray-500 border text-center h-full' onChange={(e) => dispatch(findDistrict(e.target.value))}>
                <option value=""></option>
                {Object.entries(findDis(data).map(([key,value], index) =>(
                    <option key={index} value={key}>{key} 共有 {value as number} 個</option>
                )))}
            </select>
            <KeywordInput 
                keyword={keyword} 
                otherStyle="max-w-100 h-full"
                placeholder="關鍵字..." 
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                    dispatch(findAddress(e.target.value))
                }}/>
            </div>
            <p>目前已獲取 {currentData.length} 筆資料</p>
        </div>
    <table className='min-w-full table-fixed border-collapse'>
        <thead>
            <tr className='w-full bg-gray-500 text-white'>
                <th className={` py-2 px-4 border border-gray-900`}>編號</th>
                <th className={` py-2 px-4 border border-gray-900`}>地區</th>
                <th className={` py-2 px-4 border border-gray-900`}>地址</th>
                <th className={` py-2 px-4 border border-gray-900`}>地圖</th>
                <th className={` py-2 px-4 border border-gray-900`}>已租借</th>
                <th className={` py-2 px-4 border border-gray-900`}>未租借</th>
                <th className={` py-2 px-4 border border-gray-900`}>總數量</th>
                <th className={` py-2 px-4 border border-gray-900`}>資料更新時間</th>
            </tr>
        </thead>
        <tbody>
            {Array.isArray(data) && isBike &&  CurrentItems.map((d, index :number) :React.ReactNode=>{
                const displayIndex = index + 1
                const address = d.sarea + d.ar
                return (
                    <tr key={displayIndex} className={`odd:hover:bg-gray-800 even:hover:bg-gray-500 even:hover:text-white transition-all duration-500 `}>
                        <th className={`py-2 px-4 border border-gray-900`}>{displayIndex}</th>
                        <th className={`py-2 px-4 border border-gray-900`}>{d.sarea}</th>
                        <th className={`py-2 px-4 border border-gray-900`}>{d.ar}</th>
                        <th className={` border border-gray-900`}>
                            <a href={`https://www.google.com/maps?q=${address}`} className='inline-block w-full h-full' target="_blank" rel="noopener noreferrer">📍</a>
                        </th>
                        <th className={`py-2 px-4 border border-gray-900`}>{d.available_rent_bikes}</th>
                        <th className={`py-2 px-4 border border-gray-900`}>{d.available_return_bikes}</th>
                        <th className={`py-2 px-4 border border-gray-900`}>{d.Quantity}</th>
                        <th className={`py-2 px-4 border border-gray-900`}>{d.srcUpdateTime}</th>
                    </tr>
                )
            })}
            
        </tbody>
    </table>
    <Pagination totalPage={totalPage} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
    
    
    </div>
  )
}
