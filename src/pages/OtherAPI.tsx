import React, { useEffect, useRef, useState } from 'react'
import Select from '../components/other/select'
import { useDispatch, useSelector } from 'react-redux'
import {resetData, updateData , setLoading } from "../features/otherApi/otherSlice"
import FetchStatus from '../components/other/FetchStatus'
import YouBike from '../components/other/YouBike'
import Weather from '../components/other/Weather'
import StatusFrame from '../components/StatusFrame'
import Button from '../components/Button'


type status = { type :  "idle" | "loading" | "success" | "error" , msg :string}



const OtherAPI = () => {
  const { currentURL, link , statusApi} = useSelector((state: any) => state.otherApi)
  const [status , setStatus] = useState<status>({type: "idle" , msg: "目前閒置中..." })
  const dispatch = useDispatch()
  const timeRef = useRef<number | null>(null)

  const handleReset = () => {
    dispatch(setLoading(true))
    dispatch(resetData("資料重新設定中..."))

    timeRef.current = window.setTimeout(()=>{
        dispatch(setLoading(false))
        timeRef.current = null
    },)
    
  }
  useEffect(()=>{
    return () => {
      if(timeRef.current) clearTimeout(timeRef.current)
    }
  },[])

  useEffect(()=>{
    if(currentURL.trim() === "") {
      setStatus({type: "idle" , msg: "目前閒置中..." })
      return
    }
    dispatch(setLoading(true))

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
      }finally{
        dispatch(setLoading(false))
      }
      return 
    }
    
    fetchData(currentURL)

    return ()=>{mounted =false}
    
  },[currentURL],)

  return (
    <div className='relative w-full h-full px-12 pb-0 text-white'>
      
      <div className='other-header flex  gap-4 h-[10%] flex items-center justify-center'>
        <Select/>
        <FetchStatus type={status.type} msg={status.msg}/>
         {/* @ts-ignore */}
        <Button label='Reset' onClick={handleReset} otherStyle="rounded-md"/>
      </div>
      <div className='other-main h-[90%] p-8 overflow-y-auto '>
        {(status.type === "success" && currentURL === link.bike_url )  && <YouBike />}
        {(status.type === "success" ) && currentURL === link.weather_url   && <Weather />}
      </div>
      {( statusApi.isLoading )&& <StatusFrame/>}

    </div>
  )
}

export default OtherAPI