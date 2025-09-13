import React, { useEffect, useRef, useState } from 'react'
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
    <div 
        className='weather-container flex xl:flex-row flex-col items-start justify-start md:gap-4 gap-10 xl:pb-0 pb-10 w-full h-full overflow-auto'
        
        >
        {data && <Hourly data={data} isOpen={isOpen} setIsOpen={setIsOpen}/>}

        <div className='hidden xl:block  relative z-[1] w-full h-[70vh] lg:flex-2 '>
         <Map lat={inputlocation.latitude} long={inputlocation.longitude} />
        </div>


        <div className='flex lg:flex-2  flex-col gap-4 w-full px-4 pb-4'>
            <div className='w-full flex md:flex-row flex-col items-center justify- text-xl gap-4 '>
                <div className='flex sm:flex-row flex-col items-center py-2 w-full'>
                    <label htmlFor=""  className='block min-w-20'>經度：</label>
                    <KeywordInput 
                    keyword={inputlocation.latitude}
                    placeholder='經度：'
                    onChange={(e)=> setInputLocaltion(prev => ({...prev , latitude: e.target.value}))}
                    otherStyle='text-center rounded-md bg-white text-black h-10  w-full'/>
                </div>
                <div className='flex sm:flex-row flex-col items-center py-2 w-full'>
                    <label htmlFor=""  className='block min-w-20'>緯度：</label>
                    <KeywordInput 
                        keyword={inputlocation.longitude}
                        placeholder='緯度：'
                        onChange={(e)=> setInputLocaltion(prev => ({...prev , longitude: e.target.value}))}
                        otherStyle='text-center rounded-md bg-white text-black h-10  w-full'/>
                </div>
                <Button label="Search" 
                    onClick={()=> dispatch(changeLocation(inputlocation))}
                    otherStyle='rounded-md hover:bg-white hover:text-orange-500 h-10'/>

            </div>

            {data && data.map((i,index)=>{
                const entries = Object.entries(i)
                return (
                    <div key={index} className='flex flex-2 flex-col gap-4 '>
                        <TempItems entries={entries} setIsOpen={setIsOpen}/>

                        <div className='flex flex-col gap-2'>
                            <h3>重要資訊：</h3>
                            <div className='flex md:flex-row flex-wrap justify-start md:gap-4 gap-2'>
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
        
        <div className='lg:hidden relative z-[1] w-full px-4 pb-10 h-[70vh] md:flex-3 '>
         <Map lat={inputlocation.latitude} long={inputlocation.longitude} />
        </div>

    </div>
  )
}

export default Weather
