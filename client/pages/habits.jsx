import React, { useState, useEffect, useContext } from 'react'
import Axios from 'axios'
import {AuthContext, useAuth} from '../src/contexts/auth-context.js'
import NavBar from '../src/components/NavBar.jsx'

const habits = () => {
  
  const [habits, setHabits] = useState(null)
  const { isUserAuthenticated, isLoading, user } = useAuth();
  
  useEffect(() => {
    // Get all existing habits once we receive user from the context

    const getData = async () => {
      const headers = {
        "Authorization": "Bearer " + user.token,
        "Content-Type": 'application/json'
      }
      const res = await Axios.get(process.env.API_URL + `habits/` + user.user_id, {
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
        }
      })
    }

  }, [user])

  if(isLoading)
    return <h1>Loading...</h1>
  
  return (
    <>
      <div>habits</div>
      <ul>
        {habits
        ? habits.map((habit, idx) => {
          return (
            <li key={idx}>
              <h5>{habit.title}</h5>
              <p>{habit.description}</p>
            </li>
          )
        })
        : null}
      </ul>
      <NavBar currentIdx={1}/>
    </>
  )
}

export default habits