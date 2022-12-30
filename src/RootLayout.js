import React from 'react'
import NavigationBar from './components/navigationbar/NavigationBar'
import { Outlet } from 'react-router-dom'
function RootLayout() {
  return (
    <div>
       <NavigationBar/>
       <Outlet/>
    </div>
  )
}

export default RootLayout