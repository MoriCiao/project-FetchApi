import React from 'react'
import Button from '../Button'



export const TempItems = ({entries ,setIsOpen}) => { 
    return(
        <div className='flex flex-col gap-2 '>
            {entries.map(([key,value],ertryIndex:number)=> {
                if(["hourly_units","hourly"].includes(key)){
                    return(
                        <div key={ertryIndex} className='flex text-xl justify-between p-2 border border-white/50'>
                            <h3>{key.toUpperCase()}：</h3>
                            <Button 
                            label={key} 
                            otherStyle='rounded-md hover:bg-white hover:text-black'
                            onClick={()=> setIsOpen(prev => !prev )}/>
                        </div>
                    )
                }else if("latitude".includes(key)){
                    return(
                        <div key={ertryIndex} className='flex text-xl justify-between p-2 border border-white/50'>
                            <h3>{key.toUpperCase()}：</h3>
                            <span className='text-red-400'>負值為 °S</span>
                            <p>{value > 0 ? `${String(value.toFixed(2))} °N` : `${String(value.toFixed(2))} °S`}</p>
                        </div>
                    )
                }else if("longitude".includes(key)){
                    return(
                        <div key={ertryIndex} className='flex text-xl justify-between p-2 border border-white/50'>
                            <h3>{key.toUpperCase()}：</h3>
                            <span className='text-red-400'>負值為 °W</span>
                            <p>{value > 0 ? `${String(value.toFixed(2))} °E` : `${String(value.toFixed(2))} °W`}</p>
                        </div>
                    )
                }
                return(
                    <div key={ertryIndex} className='flex text-xl justify-between p-2 border border-white/50'>
                        <h3>{key.toUpperCase()}：</h3>
                        <p>{String(value)}</p>
                    </div>
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
    <div className={`hourly absolute left-0 top-0 flex flex-col gap-4 max-w-1/2 w-150 h-200 border border-white/50 p-8 transition duration-1000 bg-black/80 overflow-y-auto ${isOpen ? "translate-x-0" : "-translate-x-150"} `}>
        <div className='flex gap-4 items-center border p-4'>
            <h3 className='h-full font-bold'>HOURLY_UNITS(每小時單位)：</h3>
            <div className='h-full'>
            {hourly_units && Object.entries(hourly_units).map(([key,value],index) =>{
                return(
                    <p key={index}>{key} ： {String(value)}</p>
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
        
    </div>
  )
}
