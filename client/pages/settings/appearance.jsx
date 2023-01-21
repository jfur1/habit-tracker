import React, { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { useThemeContext } from '../../src/contexts/theme-context.js'
import { useAuth } from '../../src/contexts/auth-context.js'
import styles from '../../styles/Settings.module.scss'
import LoadingScreen from '../../pages/loading.jsx'


const appearance = () => {
  const { darkMode, toggleDarkMode, saveThemePreference } = useThemeContext();
  const { user, setUser } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [wasUpdated, setWasUpdated] = useState(false)

  const goBack = () => {
    setLoading(true);
    router.push('/settings')
  }
  const toggleAppearance = () => {
    toggleDarkMode();
  }

  const savePreference = async (e) => {
    const res = await saveThemePreference(darkMode, user);
    if(res.status === 201){
      var updatedUser = {...user, theme: res.data.theme }
      setUser(updatedUser);
      setWasUpdated(true);
    }
  }

  const SuccessBanner = () => {
    return (
        <>
          <p className="success">Success!</p>
        </>
    )
  } 


  if(loading)
    return <LoadingScreen/>


  return (
    <div className={styles["appearance"] + ' ' + styles["container"]}>

      <div className={styles["top"]}>
          <span className={styles.backBtnContainer}>
              <p className={styles["backBtn"]} onClick={goBack}>&larr;</p>
          </span>
          <h1 className={styles["title"]}>Appearance</h1>
      </div>
      <p className={styles["desc"]}>
        Save a theme preference for when you sign in on other devices.
      </p>
      <p className={styles["preference"]}>
        Current saved preference: {user?.theme === 0 ? "light" : "dark"}
      </p>
      {wasUpdated 
            ? <SuccessBanner/>
            : null}

      <button className={styles["toggle"]} onClick={toggleAppearance}>Toggle Dark Mode</button>

      <button className={styles["save"]} onClick={savePreference}>Save Preference</button>
    </div>
  )
}

export default appearance