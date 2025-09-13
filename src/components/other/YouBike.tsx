import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { findDistrict, findAddress } from "../../features/otherApi/otherSlice"
import KeywordInput from '../KeywordInput'
import Pagination from './Pagination'

const data_per_page = 20

type DataYoubike = {
  Quantity: number;
  act: string;
  ar: string;
  aren: string;
  available_rent_bikes: number;
  available_return_bikes: number;
  infoDate: string;
  infoTime: string;
  latitude: number;
  longitude: number;
  mday: string;
  sarea: string;
  sareaen: string;
  sna: string;
  snaen: string;
  sno: string;
  srcUpdateTime: string;
  updateTime: string;
};

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

    function findDis<
        T extends Record<string , number | string>,
        >(obj : T[]){
        let result = obj.reduce<Record<string, number>>((acc , cur) => {   
            acc[cur.sarea] = (acc[cur.sarea] || 0 ) +1
            return acc
        },{})
     
        return Object.entries(result)
    }
    useEffect(()=>{
        setCurrentPage(1)
    },[currentURL, keyword])

   
    
  return (
    <div className='relative w-full flex flex-col gap-4 lg:px-8 py-4 overflow-hidden '>
        <div className={`flex items-center justify-between md:flex-row flex-col md:gap-4 gap-2 sm:h-20 h-auto`}>
            <div className='h-full flex sm:flex-row flex-col items-center gap-4 md:w-auto w-full'>
                <select name="" id="" className='bg-gray-500 border text-center md:w-50 w-full h-10' onChange={(e) => dispatch(findDistrict(e.target.value))}>
                    <option value=""></option>
                    {Object.entries(findDis(data).map(([key,value], index) =>(
                        <option key={index} value={key}>{key} 共有 {value as number} 個</option>
                    )))}
                </select>
                <KeywordInput 
                    keyword={keyword} 
                    otherStyle="md:w-50 w-full h-10"
                    placeholder="關鍵字..." 
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                        dispatch(findAddress(e.target.value))
                    }}/>
            </div>
            <p>目前已獲取 {currentData.length} 筆資料</p>
        </div>
        <div className='w-full md:h-full h-150 flex overflow-x-auto'>
            <table className='min-w-[100vw] table-fixed border-collapse md:h-auto h-150 border border-green-500'>
                <thead className='sticky -top-1 '>
                    <tr className='w-full bg-gray-500 text-white'>
                        <th className={`w-20 py-2 px-4 border border-white/50`}>編號</th>
                        <th className={`min-w-20 py-2 px-4 border border-white/50`}>地區</th>
                        <th className={`min-w-50 py-2 px-4 border border-white/50`}>地址</th>
                        <th className={`w-20 py-2 px-4 border border-white/50`}>地圖</th>
                        <th className={`min-w-20 py-2 px-4 border border-white/50`}>已租借</th>
                        <th className={`min-w-20 py-2 px-4 border border-white/50`}>未租借</th>
                        <th className={`min-w-20 py-2 px-4 border border-white/50`}>總數量</th>
                        <th className={`min-w-50 py-2 px-4 border border-white/50`}>資料更新時間</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(data) && isBike &&  CurrentItems.map((d :DataYoubike, index :number) :React.ReactNode=>{
                        const displayIndex = index + 1
                        const address = d.sarea + d.ar
                        return (
                            <tr key={displayIndex} className={`odd:hover:bg-gray-800 even:hover:bg-gray-500 even:hover:text-white transition-all duration-500 `}>
                                <th className={`py-2 px-4 border border-white/50`}>{displayIndex}</th>
                                <th className={`py-2 px-4 border border-white/50`}>{d.sarea}</th>
                                <th className={`py-2 px-4 border border-white/50`}>{d.ar}</th>
                                <th className={`border border-white/50 `}>
                                    <a href={`https://www.google.com/maps?q=${address}`} className='inline-block w-full h-full' target="_blank" rel="noopener noreferrer">📍</a>
                                </th>
                                <th className={`py-2 px-4 border border-white/50`}>{d.available_rent_bikes}</th>
                                <th className={`py-2 px-4 border border-white/50`}>{d.available_return_bikes}</th>
                                <th className={`py-2 px-4 border border-white/50`}>{d.Quantity}</th>
                                <th className={`py-2 px-4 border border-white/50`}>{d.srcUpdateTime}</th>
                            </tr>
                        )
                    })}
                    
                </tbody>
            </table>
        </div>
        <Pagination totalPage={totalPage} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        
        
    </div>
  )
}
