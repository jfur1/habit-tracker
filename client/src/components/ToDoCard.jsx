import React, { useState } from 'react'
import styles from '../../styles/ToDoCard.module.scss'
import Icon from '../components/Icon.jsx'
import { ICONS } from '../components/Icon.jsx'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import CircleSlider from '../components/CircleSlider.jsx'

const ToDoCard = ({ habit }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [numerator, setNumerator] = useState(0);

    const handleInput = (numberToSet) => {
      if(numberToSet < 0 || numberToSet > habit.frequency)
        return;

      setNumerator(numberToSet)
    }

    return (
        <div
        className={styles["container"] + " " + (isOpen ? styles["expand"] : "")}
      >
        <div className={styles["upper"]}>
            <span className={styles.iconContainer} style={{ margin: '1rem' }}>
            {!!habit?.icon || habit?.icon === 0
                ? <Icon showRings={true} index={habit.icon} squareSize={65} strokeWidth={4}/>
                : null
            }
            </span>
            <div className={styles.col}>
                <h1 className={styles.title}>{habit.title}</h1>
                <p className={styles.desc}>{habit.description}</p>
            </div>

            <span 
                class={styles["close-btn"] + ' ' + (isOpen ? styles['open'] : '')}
                onClick={() => setIsOpen(!isOpen)}
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

          <button className={styles["submit"]}>
            {numerator === habit.frequency ? "Mark Completed" : "Save Progress"}
          </button>
          
        </div>
      </div>
    )
}

export default ToDoCard