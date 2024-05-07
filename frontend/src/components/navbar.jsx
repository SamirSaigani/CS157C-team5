import React from 'react'
 import { ShoppingBag } from 'phosphor-react'
import{Link}from 'react-router-dom'

export const Navbar = () => {
  return (
    <div className='navbar'>
        <div className='links'></div>
        <Link to ="/"> Shop</Link>
        <Link to="/Cart"> </Link>
        <ShoppingBag size={37}/>
    </div>
  )
}
