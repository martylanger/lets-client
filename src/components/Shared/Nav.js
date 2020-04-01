import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = () => (
  <nav>
    <NavLink to='/'>Home</NavLink>
    <NavLink to='/elections'>Elections</NavLink>
    <NavLink to='/create-election'>Create Election</NavLink>
  </nav>
)

export default Nav
