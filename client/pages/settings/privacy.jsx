import React from 'react'
import { useRouter } from 'next/router'
import styles from '../../styles/Settings.module.scss'

const privacy = () => {
  const router = useRouter();
  const goBack = () => {
    router.push('/settings')
  }
  return (
    <div className={styles["container"]}>
      <div className={styles["top"]}>
          <span className={styles.backBtnContainer}>
              <p className={styles["backBtn"]} onClick={goBack}>&larr;</p>
          </span>
          <h1 className={styles["title"]}>Privacy & Security</h1>

      </div>
      <div className={styles["body"]}>
        <p>🚧 Under Construction</p>
      </div>
    </div>
  )
}

export default privacy