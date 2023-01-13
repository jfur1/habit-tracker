import React from 'react'
import Axios from 'axios'
import styles from '../styles/Stats.module.scss'
import NavBar from '../src/components/NavBar.jsx'
import Dropdown from '../src/components/Dropdown.jsx'
import { AuthContext, useAuth } from '../src/contexts/auth-context.js'
import { useDataContext } from '../src/contexts/data-context.js'
import LoadingScreen from './loading.jsx'

const stats = () => {
  const { user, isLoading } = useAuth();
  const { ctxHabits, ctxEntries, userDataLoading } = useDataContext();

  if(isLoading || userDataLoading)
    return <LoadingScreen/>

  return (
    <div className={styles["main"]}>
      <h1 className={styles["title"]}>Stats</h1>
      <Dropdown/>
      <NavBar currentIdx={3}/>
    </div>
  )
}

export default stats