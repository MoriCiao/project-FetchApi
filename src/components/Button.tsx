import React from 'react'

type BtnProps = {
    label: string,
    otherSytle: string
    onClick : () => void,
}

const Button = ({label, onClick, otherSytle} :BtnProps): React.JSX.Element => {
  return (
    <button 
        className={`border text-large font-bold px-4 ${otherSytle}`} 
        onClick={onClick}>
        {label}
    </button>
  )
}
export default Button