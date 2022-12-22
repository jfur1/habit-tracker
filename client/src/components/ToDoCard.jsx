import React from 'react'
import styles from '../../styles/ToDoCard.module.scss'
import Icon from '../components/Icon.jsx'

const ToDoCard = ({ habit }) => {
  return (
    <div className={styles.card} style={{ backgroundColor: habit.color }}>
        <Icon index={habit.icon.toString()}/>
        <h1 className={styles.title}>{habit.title}</h1>

    </div>
  )
}

export default ToDoCard