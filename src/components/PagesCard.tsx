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
    <div className={`${label} md:w-120 w-80 md:h-120 sm:h-80 h-40 rounded-xl border border-black/20 bg-gradient-to-b from-white/25 via-white/10 to-transparent  flex items-center justify-center shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl `}>
        <Link to={link} className={`w-full h-full flex flex-col items-center justify-center sm:gap-4 gap-2 text-center transition-all duration-500 hover:scale-110`}>
            <h3 className='sm:text-4xl text-xl font-bold'>{title}</h3>
            <p className='sm:text-xl text-sm'>{description}</p>
        </Link>
    </div>
  )
}



export default PagesCard