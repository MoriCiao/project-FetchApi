import React from 'react'

type keyProps = {
  key :string,
  placeholder?:string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const KeywordInput :React.FC<keyProps> = ({placeholder,key, onChange}) :React.JSX.Element => {
  return (
   <input 
    type="text"  
    className={`border indent-2`} 
    placeholder={placeholder}
    value={key} onChange={onChange} />
  )
}

export default KeywordInput
