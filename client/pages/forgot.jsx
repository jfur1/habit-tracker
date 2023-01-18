import React, { useState } from 'react'
import Link from 'next/link'
import styles from '../styles/Settings.module.scss'


const forgot = () => {
    const [email, setEmail] = useState('')

    return (
        <div className={styles["forgot_password"] + ' ' + styles["container"]}>
            <div className={styles.top}>
                    <span className={styles.backBtnContainer}>
                        <Link className={styles["backBtn"]} href={'/'}>&larr;</Link>
                    </span>
                    <h1 className={styles["title"]}>Change Password</h1>
            </div>
            <p className={styles["desc"]}>
                {`Enter the email associated with your account and we'll send an email with instructions to reset your password.`}
            </p>
            
            <div className={styles["inputContainer"]}>
                <label htmlFor="html" className={styles["email_label"]}>Email</label>
                <input type="text" name="email" className={styles["email"]} onChange={(e) => setEmail(e.target.value)} value={email}/>
            </div>
            
            <div className={styles["submitContainer"]}>
                <button className={styles["submit"]}>
                    Send Instructions
                </button>
            </div>

        </div>
    )
}

export default forgot