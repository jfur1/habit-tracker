
import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import Axios from 'axios'
import { AuthContext, useAuth } from '../../src/contexts/auth-context.js'
import { DataContext, useDataContext } from '../../src/contexts/data-context.js'
import NavBar from '../../src/components/NavBar.jsx'
import styles from '../../styles/Habits.module.scss'
import Link from "next/link";
import { ICONS } from '../../src/components/Icon.jsx'
import Icon from '../../src/components/Icon.jsx'

const habits = () => {
  const router = useRouter();
  const [habits, setHabits] = useState(null);
  const { isUserAuthenticated, isLoading, user } = useAuth();
  const { userDataLoading, setUserData, userData } = useDataContext();
  
  useEffect(() => {
    // Get all existing habits once we receive user from the context

    const getData = async () => {
      const headers = {
        "Authorization": "Bearer " + user.token,
        "Content-Type": 'application/json',
        "id": user.user_id
      }
      const res = await Axios.get(process.env.API_URL + `habits`, {
        headers: headers
      });

      return res;
    }

    if(user){
      console.log("Received user from context: ", user)
      getData().then((response) => {
        if(response.status === 200){
          console.log('Returned the following habits:', response)
            setHabits(response.data);
            setUserData(response.data);
        }
      })
    }

  }, [user])

  const ROUTE_POST_ID = "habits/[id]";

  if(isLoading)
    return <h1>Loading...</h1>
  
  return (
    <>
      <div className={styles.main}>
        <h1>My Habits</h1>
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
        <NavBar currentIdx={1}/>
      </div>
    </>
  )
}

export default habits