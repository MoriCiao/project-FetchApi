
import React from 'react'

import Button from '../Button'

type PageProps<T> ={
    totalPage: T
    currentPage :T
    setCurrentPage :(value: number) => void
}

const Pagination:React.FC<PageProps<number>>= ({totalPage, currentPage,setCurrentPage}) :React.ReactNode=> {

    
  return (
    <div className='w-full  flex items-center justify-center gap-12 text-xl '>

        <Button 
        label='Prev' 
        otherStyle='cursor-pointer  hover:bg-white hover:text-black'
        onClick={()=> {
        if(currentPage === 1) return  
        setCurrentPage(currentPage - 1)
        }}/>

        <span>{currentPage} / {totalPage}</span>
        
        
        <Button 
        label='Next' 
        otherStyle='cursor-pointer  hover:bg-white hover:text-black'
        onClick={()=> {
            if(currentPage === totalPage) return
            setCurrentPage(currentPage +1)
        }}/>
    

    </div>
  )
}

export default Pagination
