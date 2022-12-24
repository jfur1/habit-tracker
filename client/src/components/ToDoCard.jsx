import React, { useState } from 'react'
import styles from '../../styles/ToDoCard.module.scss'
import Icon from '../components/Icon.jsx'
import { ICONS } from '../components/Icon.jsx'
import { AiOutlinePlusCircle } from 'react-icons/ai'

const ToDoCard = ({ habit }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        // <div className={styles.card} style={{ backgroundColor: habit.color }}>
        //     <h1 className={styles.title}>{habit.title}</h1>
        // </div>

        <div
        className={styles["container"] + " " + (isOpen ? styles["expand"] : "")}
        style={{ backgroundColor: habit.color }}
      >
        <div className={styles["upper"]}>
            <span className={styles.iconContainer} style={{ margin: '1rem' }}>
            {!!habit?.icon || habit?.icon === 0
                ? <Icon showRings={true} index={habit.icon} squareSize={65} strokeWidth={4}/>
                : null
            }
            </span>
            <h1 className={styles.title}>{habit.title}</h1>
            <span 
                class={styles["close-btn"] + ' ' + (isOpen ? styles['open'] : '')}
                onClick={() => setIsOpen(!isOpen)}
            />
        </div>
        <div className={styles["lower"]}>
          <h3>Goal: {habit.frequency} {habit.units}</h3>
          <div>Every: {habit.schedule.split(',').map((day, idx) => 
            <p>{day}</p>
          )} {habit.units}</div>
          <h3>
            {habit.description}
          </h3>
        </div>
      </div>
    )
}

export default ToDoCard