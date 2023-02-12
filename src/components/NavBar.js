import React from 'react'
import Login  from "./Login"
import styles from '../App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFireFlameSimple } from '@fortawesome/free-solid-svg-icons'

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <ul className="navbar-nav me-auto">
      <li className="nav-item brandIcon"><FontAwesomeIcon icon={faFireFlameSimple} /></li>
      <li className="nav-item brandSpan">Fire<span className="rightBrandSpan">Fy</span></li>
    </ul>
    <ul className="navbar-nav ms-auto">
      <li className="nav-item"><Login /></li>
    </ul>
  </nav>
  )
}

export default NavBar