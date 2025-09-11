import React from 'react'
import { Fade } from 'react-awesome-reveal'
import { Outlet } from 'react-router'

const AppOutlay = () => {
  return (
    <Fade>
        <Outlet />
    </Fade>
  )
}

export default AppOutlay