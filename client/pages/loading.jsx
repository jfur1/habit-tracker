import React from 'react'
import styles from '../styles/Loading.module.scss'

const loading = () => {
  return (
    <>
        <h1>Loading...</h1>
        <div className={styles["loader"]}></div>
    </>
  )
}

export default loading