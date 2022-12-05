import React from 'react'
import Link from 'next/link'
import styles from '../styles/Register.module.scss'

const register = () => {
  return (
    <div className={styles['container']}>
        <div className={styles['register-box']}>
            <h2>Register</h2>
            <form>
                <div className={styles['input-box']}>
                    <input type="email" name="email" id='email' required/>
                    <label>Email</label>
                </div>
                <div className={styles['input-box']}>
                    <input type="password" name="password" id='password' required/>
                    <label>Password</label>
                </div>
                <div className={styles['input-box']}>
                    <input type="password" name="confirmPassword" id='confirmPassword' required/>
                    <label>Confirm Password</label>
                </div>
                <a href="#" className={styles['submit']}>
                    Submit
                </a>
            </form>
            <p>
                Already registered?&nbsp;
                <Link href="/login">Sign in</Link>
            </p>
        </div>
    </div>
  )
}

export default register