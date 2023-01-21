
import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import Axios from 'axios'
import { useAuth } from '../../src/contexts/auth-context.js'
import { DataContext, useDataContext } from '../../src/contexts/data-context.js'
import NavBar from '../../src/components/NavBar.jsx'
import styles from '../../styles/Habits.module.scss'
import Link from "next/link";
import { ICONS } from '../../src/components/Icon.jsx'
import Icon from '../../src/components/Icon.jsx'
import LoadingScreen from '../loading.jsx'

const habits = () => {
  const router = useRouter();
  const [habits, setHabits] = useState(null);
  const [showNewHabitForm, setShowNewHabitForm] = useState(false);
  const { isUserAuthenticated, isLoading, user } = useAuth();
  const { ctxHabits, ctxEntries, userDataLoading } = useDataContext();
  
  useEffect(() => {
    // Get all existing habits once we receive user from the context
    setHabits(ctxHabits)
  }, [ctxHabits])

  const ROUTE_POST_ID = "habits/[id]";

  if(isLoading || userDataLoading)
    return <LoadingScreen/>
  
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
  return (
    <>
      <div className={styles.main}>
        <h1 className={styles["title"]}>Habits</h1>

        { (habits === null || habits.length === 0)
          ? <NewUserPrompt/>
          : 
          <ul className={styles.habits}>
            {habits
            ? habits.map((habit, idx) => {
                return (
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
                      <span className={styles.iconContainer} style={{ margin: '1rem' }}>
                        {ICONS[habit.icon].icon}
                      </span>
                      <h1 className={styles.title}>{habit.title}</h1>
                      <p></p>
                    </li>
                  </Link>
                )
            })
            : null}
          </ul>
        }


        <NavBar currentIdx={1} showNewHabitForm={showNewHabitForm} setShowNewHabitForm={setShowNewHabitForm}/>
      </div>
    </>
  )
}

export default habits