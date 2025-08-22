import React, { ReactNode } from 'react'
import { Link } from 'react-router'

type CardProps = {
    label:string
    title:string
    link: string
    description:string
}

const PagesCard :React.FC<CardProps> = ({label,title, link, description}) :ReactNode=> {
  return (
    <div className={`${label} w-120 h-120 rounded-xl border border-white/50 bg-gradient-to-br from-white/20 via-white/30 to-white/20 text-white flex items-center justify-center shadow-md transition-all duration-500 hover:-translate-y-2 `}>
        <Link to={link} className={`w-full h-full flex flex-col items-center justify-center gap-4 text-center `}>
            <h3 className='text-3xl'>{title}</h3>
            <p>{description}</p>
        </Link>
    </div>
  )
}



export default PagesCard