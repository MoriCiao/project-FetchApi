import React from 'react'

type Status = {
    type:"loading" | "success" | "error" | "idle",
    msg: string
}

const FetchStatus:React.FC<Status> = ({type, msg}) :React.ReactNode =>{
  let color:string
  switch(type){
    case "loading":{
        color="text-white"
      break
    }
    case "success":{
        color="text-green-500"
      break
    }
    case "error":{
        color="text-red-500"
      break
    }
    case "idle":{
        color="text-orange-500"
      break
    }
    default:{
        color="text-gray-500";
        break
    }
 }
 return <p className={color}>{msg}</p>
}


export default FetchStatus
