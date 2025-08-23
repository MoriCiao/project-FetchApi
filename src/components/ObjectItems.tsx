import React, { ReactNode } from 'react'

type ItemProps = {
  label : string
  text:string
}

export const ObjectItem: React.FC<ItemProps> = ({label ,text})=> {
  return (
    <div className='flex border py-2 px-4'>
      <label>{label.toUpperCase()}：</label>
      <p>{text}</p>
    </div>

  )
}

