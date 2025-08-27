import React from 'react'
import { useSelector } from 'react-redux'

const p_style = "flex items-center justify-center bg-black/50 m-auto w-[200px] h-[200px] rounded-full text-center text-white text-[1.5rem]"

function StatusFrame() {
    const { status } =useSelector((state:any )=> state.search)
    const { statusApi } = useSelector((state: any) => state.otherApi)
  return (
    <div className='fixed inset-0 z-[10] bg-black/50 flex items-center justify-center w-full h-full select-none'>
        {(status.isLoading || statusApi.isLoading ) && <p className={`${p_style}`}>Loading...</p>}
        {(status.isDownload || statusApi.isDownload ) && <p className={`${p_style}`}>Download ✅</p>}
        {(status.isError || statusApi.isError ) && <p className={`${p_style}`}>Error! 🚨</p>}
    </div>
  )
}

export default StatusFrame