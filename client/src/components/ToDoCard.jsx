import React, { useState, useEffect } from 'react'
import router from 'next/router'
import Axios from 'axios'
import styles from '../../styles/ToDoCard.module.scss'
import Icon from '../components/Icon.jsx'
import { ICONS } from '../components/Icon.jsx'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import CircleSlider from '../components/CircleSlider.jsx'

const ToDoCard = ({ habit, entry, isOpen, setIsOpen }) => {
    const [numerator, setNumerator] = useState(!!entry ? entry.frequency: 0);
    var today = new Date();

    const handleInput = (numberToSet) => {
      if(numberToSet < 0 || numberToSet > habit.frequency)
        return;

      setNumerator(numberToSet)
    }

    const handleShowToggle = (habit_id) => {

      // Base case: Close card
      if(isOpen === habit_id)
        setIsOpen(null)

      // Base Case #2: Open card
      else 
        setIsOpen(habit_id)
    }

    const handleSubmit = async (e) => {
      e.preventDefault();

      const postData = async() => {
        
        const user = JSON.parse(localStorage.getItem('user'));
        const user_id = user.user_id;

        var ymd = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()

        const entryData = {
          user_id: user_id,
          ymd: ymd,
          dowIdx: today.getDay(),
          habit_id: habit.habit_id,
          frequency: numerator,
          units: 'times', // TODO: Make editable
        }

        const headers = {
          "Authorization": "Bearer " + user.token,
          "Content-Type": 'application/json'
        }

        const res = await Axios.post(process.env.API_URL + `entries`, entryData, {
          headers: headers
        });

        return res;
      }

      postData().then((data) => {
        if(data.status === 201 || data.status === 200){
          console.log('Results after trying to create new habit:', data)
          // Close form after success
          router.reload(window.location.pathname);
        }
      })
    }

    return (
        <div
        className={styles["container"] + " " + (isOpen === habit.habit_id ? styles["expand"] : '')}
        key={habit.habit_id}
        disabled={(isOpen !== habit.habit_id & isOpen !== null)}
      >
        <div className={styles["upper"]}>
            <span className={styles.iconContainer} style={{ margin: '1rem' }}>
            {!!habit?.icon || habit?.icon === 0
                ? <Icon showRings={true} index={habit.icon} squareSize={60} strokeWidth={4} iconColor={habit.color}/>
                : null
            }
            </span>
            <div className={styles.col}>
                <h1 className={styles.title}>{habit.title}</h1>
                <p className={styles.desc}>{habit.description}</p>
            </div>

            <span 
                className={styles["close-btn"] + ' ' + (isOpen === habit.habit_id ? styles['open'] : '')}
                onClick={() => handleShowToggle(habit.habit_id)}
            />
        </div>
        <div className={styles["lower"]}>

          <h3 className={styles["goal"]}>
            Goal: {habit.frequency} {habit.units} per day
          </h3>

          <div className={styles["row"]}>
            <p className={styles["minus"]} onClick={() => handleInput(numerator - 1)}>-</p>
            <CircleSlider 
              squareSize="175"
              strokeWidth="15"
              numerator={numerator}
              denominator={habit.frequency}
              color={habit.color}
            />
            <p className={styles["plus"]} onClick={() => handleInput(numerator + 1)}>+</p>
          </div>

          <button 
            className={styles["submit"]}
            onClick={handleSubmit}
            style={numerator > 0 
              ? { color: 'white', 'backgroundColor': habit.color } 
              : 
              { 
                color: 'rgb(90, 90, 90)',
                'backgroundColor': 'rgb(133, 133, 133)'
              }
            }
          >
            {numerator === habit.frequency ? "Mark Completed" : "Save Progress"}
          </button>
          
        </div>
      </div>
    )
}

export default ToDoCard