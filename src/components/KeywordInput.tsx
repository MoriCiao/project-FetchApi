import React from 'react'

type keyProps = {
  keyword :string | number
  placeholder?:string
  otherStyle?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const KeywordInput :React.FC<keyProps> = ({placeholder,keyword, onChange,otherStyle}) :React.JSX.Element => {
  return (
   <input 
    type="text"  
    className={`border indent-2 ${otherStyle}`} 
    placeholder={placeholder}
    value={keyword} onChange={onChange} />
  )
}

export default KeywordInput
