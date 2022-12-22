import React from 'react'
import styles from '../../styles/ToDoCard.module.scss'
import Icon from '../components/Icon.jsx'
import { ICONS } from '../components/Icon.jsx'

const ToDoCard = ({ habit }) => {
  return (
    <div className={styles.card} style={{ backgroundColor: habit.color }}>
        <span className={styles.iconContainer} style={{ margin: '1rem' }}>
        {!!habit?.icon
            ? ICONS[habit.icon].icon
            : null
        }
        </span>
        <h1 className={styles.title}>{habit.title}</h1>
        
    </div>
  )
}

export default ToDoCard