import React from 'react'
import { useRouter } from 'next/router'
import styles from '../../styles/Settings.module.scss'

const about = () => {
  const router = useRouter();
  const goBack = () => {
    router.push('/settings')
  }
  return (
    <div className={styles["about"] + ' ' + styles["container"]}>
      <div className={styles["top"]}>
          <span className={styles.backBtnContainer}>
              <p className={styles["backBtn"]} onClick={goBack}>&larr;</p>
          </span>
          <h1 className={styles["title"]}>About</h1>
      </div>

      <p className={styles["version"]}>Version 1.0.0</p>
      <p className={styles["author"]}>by John Furlong</p>

      <p className={styles["feedback"]}>Feedback: </p>
      <p className={styles["feedback_link"]}>{`habit-tracker-support@gmail.com`}</p>

      <div className={styles["copyright"]}>
        <h3 className={styles["title"]}>MIT License</h3>
        <p className={styles["desc"]}>
          Copyright (c) 2012-2023 Scott Chacon and others
        </p>
        <p className={styles["desc"]}>
          Permission is hereby granted, free of charge, to any person obtaining
          a copy of this software and associated documentation files (the
          "Software"), to deal in the Software without restriction, including
          without limitation the rights to use, copy, modify, merge, publish,
          distribute, sublicense, and/or sell copies of the Software, and to
          permit persons to whom the Software is furnished to do so, subject to
          the following conditions:
        </p>
        <p className={styles["desc"]}>
          The above copyright notice and this permission notice shall be
          included in all copies or substantial portions of the Software.
        </p>
        <p className={styles["desc"]}>
          THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
          EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
          NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
          LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
          OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
          WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
        </p>
      </div>
    </div>
  )
}

export default about