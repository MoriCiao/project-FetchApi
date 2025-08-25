import { p } from 'framer-motion/client'
import React from 'react'

type tagProps ={
    label: string
    otherStyle?: string
}

const Tag :React.FC<tagProps> = ({label, otherStyle}) => {
  return (
    <span className={`border px-4 rounded-full cursor-default ${otherStyle}`}>{label}</span>
  )
}

export default Tag
