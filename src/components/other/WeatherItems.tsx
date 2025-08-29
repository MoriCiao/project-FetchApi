import React, { Children, useRef } from 'react'
import Button from '../Button'

const dataKeys = {
    latitude : "緯度",
    longitude : "經度",
    generationtime_ms : "產生時間（毫秒）",
    utc_offset_seconds :   "與 UTC 時差（秒）",
    timezone : "時區名稱",
    timezone_abbreviation : "時區縮寫",
    elevation : "海拔高度",
    hourly_units : "每小時資料單位",
    hourly : "每小時天氣資料"
}


const TempItem = ({children}) =>{
    const x = useRef<HTMLDivElement>(null)
    
    return (
        <div ref={x} className={`flex  md:text-xl items-center items-center justify-between p-2 border border-white/50`}>
            {children}
        </div>
    )
}

export const TempItems = ({entries ,setIsOpen}) => { 

     
    return(
        <div className='flex flex-col gap-2 '>
            {entries.map(([key,value],ertryIndex:number)=> {
                if("hourly".includes(key)){
                    return(
                        <TempItem key={ertryIndex}>
                            <h3>{dataKeys[key]}：</h3>
                            <Button 
                            label={'每小時資料'} 
                            otherStyle='rounded-md hover:bg-white hover:text-black'
                            onClick={()=> setIsOpen(prev => !prev )}/>
                        </TempItem>
                    )
                }else if("latitude".includes(key)){
                    return(
                        <TempItem key={ertryIndex}> 
                            <h3>{dataKeys[key]}：</h3>
                            <span className='text-sm text-center text-red-400 md:w-60 w-30'>（未必精準）<br /> 負值為 °S</span>
                            <p className='w-30 text-end'>{value > 0 ? `${String(value.toFixed(2))} °N` : `${String(value.toFixed(2))} °S`}</p>
                        </TempItem>
                    )
                }else if("longitude".includes(key)){
                    return(
                        <TempItem key={ertryIndex}> 
                            <h3>{dataKeys[key]}：</h3>
                            <span className='text-sm text-center text-red-400 md:w-60 w-30'>（未必精準）<br />負值為 °W</span>
                            <p className='w-30 text-end'>{value > 0 ? `${String(value.toFixed(2))} °E` : `${String(value.toFixed(2))} °W`}</p>
                        </TempItem>
                    )
                }else if("elevation".includes(key)){
                    return(
                        <TempItem key={ertryIndex}> 
                            <h3>{dataKeys[key]}：</h3>
                            <p>{String(value)} m</p>
                        </TempItem>
                    )
                }else if(["hourly_units","timezone_abbreviation"].includes(key)){
                    return null
                }
                return(
                    <TempItem key={ertryIndex}>
                        <h3>{dataKeys[key]}：</h3>
                        <p>{String(value)}</p>
                    </TempItem>
                )
            })}
        </div>
    )
}

export const Hourly = ({data,isOpen,setIsOpen}) => {
    const hourly_units = data?.[0]?.hourly_units
    const hourly = data?.[0]?.hourly
    const timeList = hourly ? (Object.values(hourly)[0] as string[]) : []
    const tempList = hourly ? (Object.values(hourly)[1] as string[]) : []
    if(!data || !data[0]) {
        return <p>資料載入中...</p>
    }   

  return (
    <div className={`hourly absolute z-[10] left-0 top-0 flex flex-col gap-4 md:max-w-1/2 lg:w-150 w-[100vw] md:h-full h-[100vh] md:p-8 p-2 pb-4 transition duration-1000 bg-black/80 overflow-y-auto backdrop-blur-sm ${isOpen ? "translate-x-0 opacity-100" : "-translate-x-150 opacity-0"} `}>
        <div className='w-full flex justify-end px-0'>
            <Button 
                label='❎' 
                onClick={()=>setIsOpen(false)}
                otherStyle='h-10 text-2xl border-0 px-0'
            />
        </div>
        <div className='flex gap-4 items-center justify-center border p-4 '>
            <h3 className='h-full font-bold'>HOURLY_UNITS(每小時單位)：</h3>
            <div className='h-full'>
            {hourly_units && Object.entries(hourly_units).map(([key,value],index) =>{
                if(key === "time") return
                return(
                    <p key={index}>{`2 公尺高度的氣溫`} ： {String(value)}</p>
                )
            })}
            </div>
            <hr />
        </div>
        <div className='border'>
            <table className='w-full text-center'>
                <thead>
                    <tr  className='py-'>
                        {hourly && Object.keys(hourly).map((h,index)=> (
                            <th key={index} className='py-2 border'>{h.toUpperCase()}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {timeList && timeList.map((time,index)=>{
                        return(
                        <tr key={index} className='odd:hover:bg-slate-700 even:hover:bg-slate-500 '>
                            <td className='py-2 border'>{time}</td>
                            <td className='py-2 border'>{tempList[index]}°C</td>
                        </tr>
                        )
                    }
                    )}

                </tbody>
            </table>
        </div>
        <div className='w-full flex justify-center px-0'>
            <Button 
                label='Close' 
                onClick={()=>setIsOpen(false)}
                otherStyle='h-10 text-2xl px-0 hover:bg-white hover:text-red-500'
            />
        </div>
    </div>
  )
}
