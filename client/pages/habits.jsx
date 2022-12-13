import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import NavBar from '../src/components/NavBar.jsx'

const habits = () => {
  
  const [habits, setHabits] = useState(null)

  useEffect(() => {
    // Get all habits for a user
    const getData = async() => {
      const user = JSON.parse(localStorage.getItem('user'));

      const headers = {
        "Authorization": "Bearer " + user.token,
        "Content-Type": 'application/json'
      }
      const res = await Axios.get(process.env.API_URL + `habits/` + user.user_id, {
        headers: headers
      });

      return res;
    }
    getData().then((response) => {
      if(response.status === 200){
        console.log('Returned the following habits:', response)
        setHabits(response.data);
      }
    })

  }, [])
  
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