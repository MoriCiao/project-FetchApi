import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Tag from '../Tag'
import {TempItems , Hourly} from './WeatherItems'
import KeywordInput from '../KeywordInput'
import { changeLocation } from "../../features/otherApi/otherSlice"
import Button from '../Button'

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
    <div className='flex gap-4 w-full h-full '>
        {data && <Hourly data={data} isOpen={isOpen} setIsOpen={setIsOpen}/>}

        <div className='w-full h-full border flex-3'>
         MaP
        </div>
        <div className='flex flex-2 flex-col gap-4'>
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
                    <div key={index} className='border flex flex-2 flex-col gap-4 p-4'>
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
