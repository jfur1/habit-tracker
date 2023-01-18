import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Axios from 'axios'
import { useRouter } from 'next/router'
import styles from '../styles/Login.module.scss'
import {AuthContext, useAuth} from '../src/contexts/auth-context.js'

const login = () => {
    const router = useRouter()
    const { isUserAuthenticated, loading, setUser, userLogin } = useAuth();

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
        e.preventDefault()

        const userData = { email, password }

        if (!email || !password) {
            alert('Please fill all required fields.');
        } else {
            await userLogin(userData);
        }
      }

    return (
        <div className={styles['container']}>
            <div className={styles['login-box']}>
                <h2>Login</h2>
                <form>
                    <div className={styles['input-box']}>
                        <input type="email" name="email" id='email' value={email} onChange={onChange} required/>
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
                <p>
                    No account?&nbsp;
                    <Link href="/register">Register</Link>
                </p>
            </div>
        </div>
    )
}

export default login