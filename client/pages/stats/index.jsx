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

  useEffect(() => {
    setEntries(ctxEntries);
    setHabits(ctxHabits);
  }, [ctxHabits, ctxEntries]);

  if(isLoading || userDataLoading)
    return <LoadingScreen/>

  const ROUTE_POST_ID = "stats/[id]";

  return (
    <div className={styles["main"]}>
      <h1 className={styles["title"]}>Stats</h1>
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
      {/* {habits?.map((habit) => 
        <p>{habit.title}</p>
      )} */}
      {/* <Dropdown/> */}
      <NavBar currentIdx={3}/>
    </div>
  )
}

export default stats