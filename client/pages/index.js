import React, { useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Axios from 'axios'
import { useRouter } from 'next/router'
// import { AuthContext } from '../src/context/auth-context.js'
import styles from '../styles/Home.module.scss'
import {AuthContext, useAuth} from '../src/contexts/auth-context.js'
import LoadingScreen from './loading.jsx'

export default function Home() {
  const router = useRouter()
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoginLoading] = useState(false)
    const { isUserAuthenticated, isLoading, setUser, userLogin, setLoading } = useAuth();

  const date = new Date()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;

  const onChange = (e) => {
      setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      }))
  }

  const onSubmit = async (e) => {
    setLoginLoading(true);
    e.preventDefault()
    const userData = { email, password }

    if (!email || !password) {
        alert('Please fill all required fields.');
    } else {
        await userLogin(userData);
    }
  }

  const registerUser = () => {
    router.push('/register')
  }

  if(isLoading || loading)
    return <LoadingScreen/>


  return (
    <div className={styles.container}>
      
      <main className={styles.main}>
        <h1 className={styles.title}>
          Habit Tracker
        </h1>

        <p className={styles.description}>
          On average, it takes 66 days to form a new habit. We can help you do it in less.
        </p>

          <div className={styles['login-box']}>
              <form>
                  <div className={styles['input-box']}>
                      <input type="text" name="email" id='email' value={email} onChange={onChange} required/>
                      <label>Email</label>
                  </div>
                  <div className={styles['input-box']}>
                      <input type="password" name="password" id='password' value={password} onChange={onChange} required/>
                      <label>Password</label>
                  </div>
                  <a href="" onClick={onSubmit} className={styles['submit']}>
                      Submit
                  </a>
              </form>
              <div className={styles["forgot"]}>
                <Link className={styles['forgotLink']} href="/forgot">
                  Forgot password?
                </Link>
              </div>
          </div>

          <div className={styles["seperator"]}>
            <span className={styles['or']}>or</span>
          </div>

          <Link className={styles["register"]} href={'/register'}>
            Create new account
          </Link>
      </main>

      <footer className={styles.footer}>
        Habit Tracker {date.getFullYear()} &copy;        
      </footer>
    </div>
  )
}
