import React from 'react'
import styles from '../styles/Stats.module.scss'
import NavBar from '../src/components/NavBar.jsx'
import Dropdown from '../src/components/Dropdown.jsx'

const stats = () => {
  return (
    <div className={styles["main"]}>
      <h1 className={styles["title"]}>Stats</h1>
      <Dropdown/>
      <NavBar currentIdx={3}/>
    </div>
  )
}

export default stats