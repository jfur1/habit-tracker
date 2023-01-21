import React from 'react'
import styles from '../styles/Loading.module.scss'

const loading = () => {
  return (
    <div className={styles["main"]}>
        <h1 className={styles['title']}>Loading...</h1>
        <div className={styles["loader"]}></div>
    </div>
  )
}

export default loading