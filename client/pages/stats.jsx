import React from 'react'
import NavBar from '../src/components/NavBar.jsx'
import Dropdown from '../src/components/Dropdown.jsx'

const stats = () => {
  return (
    <>
    <Dropdown/>
    <NavBar currentIdx={3}/>
    </>
  )
}

export default stats