import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Tag from '../Tag'
import {TempItems , Hourly} from './WeatherItems'
import KeywordInput from '../KeywordInput'
import { changeLocation } from "../../features/otherApi/otherSlice"
import Button from '../Button'
import Map from '../Map'

const Weather = () => {
    const {data , currentURL, localtion} = useSelector((state:any)=>state.otherApi)
    const [ isOpen, setIsOpen ] = useState(false)
    const [inputlocation ,setInputLocaltion] = useState({
        latitude : localtion.latitude,
        longitude : localtion.longitude
  })
   const dispatch = useDispatch()
    useEffect(()=>{

    },[currentURL,data])
 
  return (
    <div className='md:flex lg:flex-row flex-col md:gap-4 gap-10 w-full h-full border overflow-auto'>
        {data && <Hourly data={data} isOpen={isOpen} setIsOpen={setIsOpen}/>}

        <div className='relative z-[1] w-full md:h-[70vh] min-h-100 md:flex-3 flex-1 border border-red-500 overflow-hidden'>
         <Map lat={inputlocation.latitude} long={inputlocation.longitude} />
        </div>
        <div className='flex md:flex-2 flex-1 flex-col gap-4 px-4'>
            <div className='w-full flex items-center justify-around text-xl '>
                <div className='flex py-2'>
                    <label htmlFor="">經度：</label>
                    <KeywordInput 
                    keyword={inputlocation.latitude}
                    onChange={(e)=> setInputLocaltion(prev => ({...prev , latitude: e.target.value}))}
                    otherStyle='text-center rounded-md bg-white text-black'/>
                </div>
                <div className='flex py-2'>
                    <label htmlFor="">緯度：</label>
                    <KeywordInput 
                        keyword={inputlocation.longitude}
                        onChange={(e)=> setInputLocaltion(prev => ({...prev , longitude: e.target.value}))}
                        otherStyle='text-center rounded-md bg-white text-black'/>
                </div>
                <Button label="Search" 
                    onClick={()=> dispatch(changeLocation(inputlocation))}
                    otherStyle='rounded-md py-2 hover:bg-white hover:text-orange-500 '/>

            </div>

            {data && data.map((i,index)=>{
                const entries = Object.entries(i)
                return (
                    <div key={index} className='flex flex-2 flex-col gap-4'>
                        <TempItems entries={entries} setIsOpen={setIsOpen}/>

                        <div className='flex flex-col gap-2'>
                            <h3>重要資訊：</h3>
                            <div className='flex gap-4'>
                            {entries.map(([key,_],keyIndex)=>{
                                const names = ["latitude", "longitude","elevation", "timezone"]
                                if(!names.includes(key.toLowerCase())){
                                    return null
                                }
                                return(
                                    <Tag key={keyIndex} label={key.toUpperCase()} otherStyle='hover:bg-white hover:text-black'/>
                                )
                            })}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
        
    </div>
  )
}

export default Weather
