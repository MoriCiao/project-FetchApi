import React from 'react'

type Status = {
    type:"loading" | "success" | "error" | "idle",
    msg: string
}

const FetchStatus:React.FC<Status> = ({type, msg}) :React.ReactNode =>{
  let color:string
  let backgroundColor :string
  switch(type){
    case "loading":{
        color="text-white border-blue-500/50 hover:bg-blue-500 hover:border-white/50";
        backgroundColor ="bg-blue-500/50"
      break
    }
    case "success":{
        color="text-white border-green-500/50 hover:bg-green-500 hover:border-white/50"
        backgroundColor ="bg-green-500/50"
      break
    }
    case "error":{
        color="text-white border-red-500/50 hover:bg-red-500 hover:border-white/50"
        backgroundColor ="bg-red-500/50"
      break
    }
    case "idle":{
        color="text-white border-orange-500/50 hover:bg-orange-500 hover:border-white/50"
        backgroundColor ="bg-orange-500/50"
      break
    }
    default:{
        color="text-white border-orange-500/50 hover:bg-orange-500 hover:border-white/50"
        backgroundColor ="bg-orange-500/50"
        break
    }
 }
 return <p className={`${color} ${backgroundColor} py-2 px-3 rounded border transition duration-200 max-w-80 md:w-auto w-full text-center`}>{msg}</p>
}


export default FetchStatus
