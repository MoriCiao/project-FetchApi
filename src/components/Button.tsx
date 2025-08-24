import React from 'react'

type BtnProps = {
    label: string,
    otherStyle?: string
    onClick : () => void,
}

const Button = ({label, onClick, otherStyle} :BtnProps): React.JSX.Element => {
  return (
    <button 
        className={`border text-large font-bold px-4 cursor-pointer ${otherStyle}`} 
        onClick={onClick}>
        {label}
    </button>
  )
}
export default Button