import React, { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import NavBar from '../src/components/NavBar.jsx'
import { DarkModeContext } from '../src/contexts/theme-context.js'
import styles from '../styles/Settings.module.scss'

const settings = () => {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem('user');
    router.push('/');
  }

  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  const handleClick = () => {
    toggleDarkMode();
  }


  return (
    <>
    <div className={styles.container}>settings

    <div className="row">
      <div className={styles["first_name"]}></div>
      <div className={styles["last_name"]}></div>
    </div>
    <div className={styles["email"]}></div>


    <button onClick={() => {}}>Change Password</button>
    
    <button onClick={handleClick}>Toggle Dark Mode</button>

    <button onClick={logout}>Sign Out</button>
    <NavBar currentIdx={4}/>
    </div>
      </>
  )
}

export default settings