import React, { useEffect, useState } from 'react'
import Select from '../components/other/select'
import { useDispatch, useSelector } from 'react-redux'
import { updateData} from "../features/otherApi/otherSlice"
import FetchStatus from '../components/other/FetchStatus'
import YouBike from '../components/other/YouBike'
import Weather from '../components/other/Weather'


type status = { type :  "idle" | "loading" | "success" | "error" , msg :string}



const OtherAPI = () => {
  const { data , currentURL, link} = useSelector((state: any) => state.otherApi)
  const [status , setStatus] = useState<status>({type: "idle" , msg: "目前閒置中..." })
  const dispatch = useDispatch()
  console.log(data)
  console.log(currentURL)

  useEffect(()=>{
    let mounted = true
    setStatus({type: "loading" , msg: "嘗試加載資料中..." })
    async function fetchData(url:string){
      if(url.trim() === "") {
       return  setStatus({type: "idle" , msg: "目前閒置中..." })
      } 
      try{
        if(mounted){
          const res = await fetch(url)
          if(!res.ok){
            return new Error 
          }
          setStatus({type: "success" , msg: "已成功獲取資料" })
          const json = await res.json()
          dispatch(updateData( json ))
        } 
      }catch(error){
        setStatus({type: "error" , msg: "加載資料失敗!!!" })
        const msg = error instanceof Error ? error.message : error
        console.log(error , msg)
      }
      return 
    }

    
    fetchData(currentURL)

    return ()=>{mounted =false}
    
  },[currentURL],)

  return (
    <div className='w-full h-full px-12 pb-8'>
      
      <div className='other-header flex  gap-4 h-[10%] border border-red-500 flex items-center justify-center'>
        <Select/>
        <FetchStatus type={status.type} msg={status.msg}/>
      </div>
      <div className='other-main h-[90%] border p-8 overflow-y-auto'>
        {(status.type === "success" && currentURL === link.bike_url )  && <YouBike />}
        {(status.type === "success" && currentURL === link.weather_url )  && <Weather />}
      </div>


    </div>
  )
}

export default OtherAPI