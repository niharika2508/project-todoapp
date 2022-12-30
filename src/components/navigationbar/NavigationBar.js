import React from 'react'
import './NavigationBar.css'
import { NavLink } from 'react-router-dom'
import {FaUsers} from 'react-icons/fa'
import {FaUsersSlash} from 'react-icons/fa'
import {FaUserCog} from 'react-icons/fa'
function NavigationBar() {

const activeLink={
  color:"#EEF0F1",
  fontSize:"1.2rem",
  fontWeight:"bold"

}
const inactiveLink={
  color:"#EEF0F1",
  fontSize:"1.2rem",
}


  return <nav className="navbar navbar-expand-sm  bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">
    <FaUserCog className='nav-icon'/>
    </a>
   
  
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          
          <NavLink className="nav-link " style={({isActive})=>{
            return isActive?activeLink:inactiveLink
          }} to="/todos">
          <FaUsers className='users-icon'/>
            Todos list
            </NavLink>
     </li>
     <li className="nav-item">
          <NavLink className="nav-link " style={({isActive})=>{
            return isActive?activeLink:inactiveLink
          }}
          to="/removed-todos">
          <FaUsersSlash className='users-removed-icon'/> 
            Removed Todos</NavLink>
     </li>
     
       
       
      </ul>
     
    
  </div>
</nav>
}

export default NavigationBar