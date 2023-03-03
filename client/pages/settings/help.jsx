import React from 'react'
import { useRouter } from 'next/router'
import styles from '../../styles/Settings.module.scss'

const help = () => {
  const router = useRouter();
  const goBack = () => {
    router.push('/settings')
  }
  return (
    <div className={styles["help"] + ' ' +  styles["container"]}>
      <div className={styles["top"]}>
          <span className={styles.backBtnContainer}>
              <p className={styles["backBtn"]} onClick={goBack}>&larr;</p>
          </span>
          <h1 className={styles["title"]}>Help & Support</h1>
      </div>

      <div className={styles["faq"]}>
        <h3 className={styles["title"]}>FAQ</h3>

        <p className={styles["question"]}>Can I track more than one habit at a time?</p>
        <p className={styles["answer"]}>
          {`Yes! Habit Tracker App allows you to create and track multiple habits at the same time. You can view all of your habits on the stats page, which displays completion data for each habit.`}
        </p>

        <p className={styles["question"]}>What types of habits can I track?</p>
        <p className={styles["answer"]}>
          {`You can track any habit you'd like with the Habit Tracker App. Some popular habits to track include exercise, meditation, drinking water, and reading.`}
        </p>


        <p className={styles["question"]}>Can I change the attributes of a habit after I've created it?</p>
        <p className={styles["answer"]}>
          {`Yes, you can edit the attributes of a habit at any time. Simply go to the habit's details page and click the "Edit" button. You can then update the habit's name, description, frequency, and times per day.`}
        </p>

        <p className={styles["question"]}>Can I delete a habit?</p>
        <p className={styles["answer"]}>
          {`Yes, you can delete a habit at any time. Simply go to the habit's details page and click the "Delete" button. Please note that deleting a habit will permanently delete all of the habit's completion data.`}
        </p>

        <p className={styles["question"]}>Can I delete a habit?</p>
        <p className={styles["answer"]}>
          {`If you miss a day of a habit, the corresponding day on the habit's weekly schedule will show up as incomplete. You can still check off the habit on a later day, but the habit's completion data will not be updated for the missed day.`}
        </p>

        <p className={styles["question"]}>Can I view my habit completion data over time?</p>
        <p className={styles["answer"]}>
          {`Yes, the Habit Tracker App includes a chart on the dashboard that displays your habit completion data over time. The chart shows your completion percentage for each habit, as well as your overall completion percentage.`}
        </p>
      </div>

      <div className={styles["support"]}>
        <h3 className={styles["title"]}>Contact Us</h3>
        <p className={styles["subtitle"]}>Have questions? Get in touch, free of charge.</p>
        <p className={styles["email"]}>{`habit-tracker-support@gmail.com`}</p>
      </div>

    </div>
  )
}

export default help