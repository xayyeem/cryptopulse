import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import { FaBitcoin } from "react-icons/fa";

const Header = () => {
  return (
    <div className='navbar'>
        <div className="logo">
            <h1>CryptoPulse</h1>
            <FaBitcoin color='gold' size={'25'} />
        </div>
        <ul>
            <li> <Link to ='/'>Home</Link> </li>
            <li> <Link to='/coins'>Coin</Link> </li>
        </ul>
    </div>
  )
}

export default Header