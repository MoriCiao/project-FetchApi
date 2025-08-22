import React from 'react'
import { useNavigate } from 'react-router'

type NavProps = {
    to: string,
    label: string
    className?: string
}

const NavigateBtn = ({to, label, className} :NavProps): React.JSX.Element => {
    const navigate = useNavigate()
  return (
    <button className= {`px-2 border w-25 h-10 bg-black text-white rounded-md ${className}`} onClick={()=> navigate(`${to}`)}>{label}</button>
  )
}


export default NavigateBtn
