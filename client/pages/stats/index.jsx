import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import Link from 'next/link'
import styles from '../../styles/Stats.module.scss'
import NavBar from '../../src/components/NavBar.jsx'
import Dropdown from '../../src/components/Dropdown.jsx'
import { AuthContext, useAuth } from '../../src/contexts/auth-context.js'
import { useDataContext } from '../../src/contexts/data-context.js'
import LoadingScreen from '../loading.jsx'
import { ICONS } from '../../src/components/Icon.jsx'
import Icon from '../../src/components/Icon.jsx'

const stats = () => {
  const { user, isLoading } = useAuth();
  const { ctxHabits, ctxEntries, userDataLoading } = useDataContext();
  const [entries, setEntries] = useState(null);
  const [habits, setHabits] = useState(null);
  const [showNewHabitForm, setShowNewHabitForm] = useState(false);

  useEffect(() => {
    setEntries(ctxEntries);
    setHabits(ctxHabits);
  }, [ctxHabits, ctxEntries]);


  const NewUserPrompt = () => {
    return(
        <div className={styles['prompt']}>
            <h2 className={styles["title"]}>Welcome to Habit Tracker!</h2>
            <span className={styles["row"]}>
                <p className={styles["desc"]}>To get started,&nbsp;</p>
                <p className={styles["firstHabitLink"]} onClick={() => setShowNewHabitForm(true)}>create a new habit to track.</p>
            </span>
        </div>
    )
  }
  
  if(isLoading || userDataLoading)
    return <LoadingScreen/>

  const ROUTE_POST_ID = "stats/[id]";

  return (
    <div className={styles["main"]}>
      <h1 className={styles["title"]}>Stats</h1>

      { (entries === null || entries.length === 0) && (habits === null || habits.length === 0)
        ? <NewUserPrompt/>
        : 
            
        <ul className={styles["habits"]}>
          {
            habits
            ? habits.map((habit, idx) => 
              <Link
                key={'link-' + idx}
                className={styles.card}
                href={{
                  pathname: ROUTE_POST_ID,
                  query: { id: habit.habit_id }
                }}
              >
                <li
                  key={idx}
                  className={styles.card}
                  style={{ backgroundColor: habit.color }}
                >
                  <span 
                      className={styles["iconContainer"]}
                      style={{ margin: '1rem' }}
                  >
                    {ICONS[habit.icon].icon}
                  </span>
                  <h1 className={styles.title}>{habit.title}</h1>
                </li>
              </Link>
            )
            : null
          }

        </ul>
      }
      
      <NavBar currentIdx={3} showNewHabitForm={showNewHabitForm} setShowNewHabitForm={setShowNewHabitForm}/>
    </div>
  )
}

export default stats