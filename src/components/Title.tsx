import React from 'react'
import { useLocation } from 'react-router';


type TitleProps = {
    title : string,
    otherStyle? : string
}

const Title = ({title,otherStyle} :TitleProps) => {
  const { pathname } = useLocation();
  
    const bg =
      pathname === "/"
        ? "bg-transparent"
        : pathname === "/searchImg"
        ? "bg-black"
        : pathname === "/otherApi"
        ? "bg-white"
        : null;


  return (
    <h1 className={`w-full h-full flex items-center justify-center text-3xl font-[900] tracking-wide ${bg} ${otherStyle}`}>{title}</h1>
  )
}

export default Title