import React from 'react'
import { useSelector } from 'react-redux'
import { ObjectItem } from '../ObjectItems'
import { div, p } from 'framer-motion/client'

const Weather = () => {
    const {data ,filtered ,link , currentURL ,keyword} = useSelector((state:any)=>state.otherApi)


    function ToTable(obj){
       Object.entries(obj).map((i,index)=>{
        const [key , value] = i
        return (
        <div>
            <label htmlFor="">{key}</label>
            <span>{String(value)}</span>
        </div>)
       })

    }


  return (
    <div className=' grid grid-cols-2 border w-full h-full'>
        <div className='border'>Map</div>
        <div className='border flex flex-col gap-4 p-4'>
            {link.weather_url === currentURL && Object.entries(data).map((i,index)=>{
                const [key ,value] = i
                const dispalyValue: string | React.ReactNode = typeof value === "object" ? ToTable(value) : String(value)

                return (
                    <ObjectItem key={index} label={key} text={dispalyValue}/>
                )
            })}
        </div>
    </div>
  )
}

export default Weather
