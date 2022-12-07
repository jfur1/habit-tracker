import React from 'react'
import Link from 'next/link'
import styles from '../styles/Login.module.scss'

const login = () => {
  return (
    <div className={styles['container']}>
        <div className={styles['login-box']}>
            <h2>Login</h2>
            <form>
                <div className={styles['input-box']}>
                    <input type="email" name="email" id='email' required/>
                    <label>Email</label>
                </div>
                <div className={styles['input-box']}>
                    <input type="password" name="password" id='password' required/>
                    <label>Password</label>
                </div>
                <a href="#" className={styles['submit']}>
                    Submit
                </a>
            </form>
            <p>
                No account?&nbsp;
                <Link href="/register">Register</Link>
            </p>
        </div>
    </div>
  )
}

export default login