import React, { useState } from 'react'
import Link from 'next/link'
import styles from '../styles/Settings.module.scss'
import { AuthContext, useAuth } from '../src/contexts/auth-context.js'

const password = () => {
    const { isUserAuthenticated, loading, setUser, userLogin } = useAuth();

    const [formData, setFormData] = useState({
        old_password: '',
        password: '',
        password2: ''
    });
    const { old_password, password, password2 } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = async (e) => {
        // e.preventDefault();
        return;
    }

    return (
        <div className={styles["change_password"] + ' ' + styles["container"]}>
            <div className={styles.top}>
                <span className={styles.backBtnContainer}>
                    <Link className={styles["backBtn"]} href={'/settings/account'}>&larr;</Link>
                </span>
                <h1 className={styles["title"]}>Change Password</h1>
            </div>
            <form>
                <div className={styles['inputCol']}>
                    <label>Current Password</label>
                    <input type="password" name="old_password" id='old_password' value={old_password} onChange={onChange} required/>
                </div>
                <div className={styles['inputCol']}>
                    <label>New Password</label>
                    <input type="password" name="password" id='password' value={password} onChange={onChange} required/>
                </div>
                <div className={styles['inputCol']}>
                    <label>Confirm New Password</label>
                    <input type="password" name="password2" id='password2' value={password2} onChange={onChange} required/>
                </div>
                <div className={styles['inputCol']}>
                    <a href="" onClick={onSubmit} className={styles['submit']}>
                        Submit
                    </a>
                </div>
            </form>
        </div>
    )
}

export default password