import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import { DarkModeContext } from '../../src/contexts/theme-context.js'
import styles from '../../styles/Settings.module.scss'


const appearance = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const router = useRouter();

  const goBack = () => {
    router.push('/settings')
  }
  const toggleAppearance = () => {
    toggleDarkMode();
  }

  return (
    <div className={styles["appearance"] + ' ' + styles["container"]}>

      <div className={styles["top"]}>
          <span className={styles.backBtnContainer}>
              <p className={styles["backBtn"]} onClick={goBack}>&larr;</p>
          </span>
          <h1 className={styles["title"]}>Appearance</h1>
      </div>

      <button onClick={toggleAppearance}>Toggle Dark Mode</button>
    </div>
  )
}

export default appearance