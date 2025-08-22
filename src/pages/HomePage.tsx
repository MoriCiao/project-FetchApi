import React from 'react'
import PagesCard from '../components/PagesCard'
const HomePage = () => {
  return (
    <>
        <PagesCard
            label="search_image"
            title="Search Image"
            link="searchImg"
            description="需要 API Key"/>
        <PagesCard 
            label="other_api"
            title="OtherAPI" 
            link="otherApi" 
            description="無需 API Key" />
    </>
  )
}

export default HomePage
