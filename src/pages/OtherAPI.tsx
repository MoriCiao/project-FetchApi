import React, { useEffect, useRef, useState } from 'react'
import Select from '../components/other/select'
import { useDispatch, useSelector } from 'react-redux'
import {resetData, updateData , setLoading } from "../features/otherApi/otherSlice"
import FetchStatus from '../components/other/FetchStatus'
import YouBike from '../components/other/YouBike'
import Weather from '../components/other/Weather'
import StatusFrame from '../components/StatusFrame'
import Button from '../components/Button'
import { Fade } from 'react-awesome-reveal'


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
            return new Error(`HTTP 錯誤 : ${res.status}`)
          }
          const json = await res.json()

          if(!mounted) return
          dispatch(updateData( json ))
          setStatus({type: "success" , msg: "已成功獲取資料" })
        } 
      }catch(error){
        setStatus({type: "error" , msg: "加載資料失敗!!!" })
        const msg = error instanceof Error ? error.message : "發生未知錯誤"
        console.log("API 請求失敗", msg)
      }finally{
        dispatch(setLoading(false))
      }
      return 
    }
    
    fetchData(currentURL)

    return ()=>{mounted =false}
    
  },[currentURL],)

  return (
    <Fade triggerOnce={true} className={`w-full h-full`}>

      <div className='relative w-full h-full md:px-12 px-4 pb-0 text-white'>
        
        <div className='other-header gap-4 md:h-[10%] h-auto w-auto flex md:flex-row flex-col items-center justify-center'>
          {/* @ts-ignore */}
          <Button label='Reset' onClick={handleReset} otherStyle="rounded-md md:w-auto w-full max-w-80 py-2 bg-white/20 hover:bg-white/50 hover:text-black transition duration-200"/>
          <FetchStatus type={status.type} msg={status.msg}/>
          <Select/>
        </div>
        <div className='other-main lg:h-[90%] h-full md:p-8 w-full overflow-auto'>
          {(status.type === "success" && currentURL === link.bike_url )  && <YouBike />}
          {(status.type === "success" ) && currentURL === link.weather_url   && <Weather />}
        </div>
        {( statusApi.isLoading )&& <StatusFrame/>}

      </div>
    </Fade>
  )
}

export default OtherAPI