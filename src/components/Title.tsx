import React from 'react'


type TitleProps = {
    title : string,
    otherStyle? : string
}

const Title = ({title,otherStyle} :TitleProps) => {
  return (
    <h1 className={`text-3xl font-[900] tracking-wide ${otherStyle}`}>{title}</h1>
  )
}

export default Title