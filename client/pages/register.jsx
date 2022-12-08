import React, { useState } from 'react'
import Link from 'next/link'
import styles from '../styles/Register.module.scss'

const register = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        password2: '',
    });

    const { name, email, password, password2 } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
    }
    
    const onSubmit = (e) => {
        e.preventDefault()
    
        if (password !== password2) {
          alert('Passwords do not match');
        } else {
          const userData = {
            email,
            password,
          }

          await axios.post('http://localhost:8080/api/users/register')
        }
    }

    return (
        <div className={styles['container']}>
            <div className={styles['register-box']}>
                <h2>Register</h2>
                <form  onSubmit={onSubmit}>
                    <div className={styles['input-box']}>
                        <input type="email" name="email" id='email' required/>
                        <label>Email</label>
                    </div>
                    <div className={styles['input-box']}>
                        <input type="password" name="password" id='password' required/>
                        <label>Password</label>
                    </div>
                    <div className={styles['input-box']}>
                        <input type="password" name="password2" id='password2' required/>
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