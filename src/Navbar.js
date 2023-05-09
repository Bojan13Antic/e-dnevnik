import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({vrsta}) {

  if (vrsta.includes('direktor')) {
    return (
      <nav className='navbar'>
        <h1>E-dnevnik</h1>
        <div className='links'>
            <Link to='/'>Home</Link>
            <Link to='/createUcenik'>Dodaj ucenika</Link>
            <Link to='/createOdeljenje'>Dodaj odeljenje</Link>
            <Link to='/createProfesor'>Dodaj profesora</Link>
            <Link to='/poOdeljenju'>Po odeljenju</Link>
            <Link to='/PoUceniku'>Po uceniku</Link>
            <Link to='/SviProfesori'>Svi profesori</Link>
        </div>
    </nav>
    )
  }
   if ((vrsta.includes('profesor')) && (!vrsta.includes('razredni'))) {
    return (
      (
        <nav className='navbar'>
          <h1>E-dnevnik</h1>
          <div className='links'>
              <Link to='/'>Home</Link>
              <Link to='/poPredmetu'>Po predmetu</Link>
          </div>
      </nav>
      )
    )
  } else if (vrsta.includes('razredni')) {
    return (
      (
        <nav className='navbar'>
          <h1>E-dnevnik</h1>
          <div className='links'>
              <Link to='/'>Home</Link>
              <Link to='/poPredmetu'>Po predmetu</Link>
              <Link to='/poOdeljenju'>Po odeljenju</Link>
              <Link to='/PoUceniku'>Po uceniku</Link>
          </div>
      </nav>
      )
    )
  } else if (vrsta === 'ucenik') {
    return (
      (
        <nav className='navbar'>
          <h1>E-dnevnik</h1>
          <div className='links'>
              <Link to='/'>Home</Link>
              <Link to='/PoUceniku'>Po uceniku</Link>
          </div>
      </nav>
      )
    )
  } else {
  return (
    <nav className='navbar'>
        <h1>E-dnevnik</h1>
        <div className='links'>
            <Link to='/'>Home</Link>
        </div>
    </nav>
  )
}}
