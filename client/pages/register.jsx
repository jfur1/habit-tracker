import React, { useState } from 'react'
import Axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../styles/Register.module.scss'

const register = () => {
    const router = useRouter()
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
    
    const onSubmit = async (e) => {
        e.preventDefault();

        const postData = async() => {
            const userData = {
                email,
                password,
              }
              const res = await Axios.post(process.env.API_URL + 'register', userData);
    
              return res;
        }

        if (password !== password2) {
            alert('Passwords do not match');
        }
        else {
            postData().then((response) => {
                console.log(response);
                if(response.status === 201){
                    localStorage.setItem('user', response.data.token);
                    router.push('/login');
                }
            })
        }
    }

    return (
        <div className={styles['container']}>
            <div className={styles['register-box']}>
                <h2>Register</h2>
                <form  onSubmit={onSubmit}>
                    <div className={styles['input-box']}>
                        <input type="email" name="email" id='email' value={email} onChange={onChange} required/>
                        <label>Email</label>
                    </div>
                    <div className={styles['input-box']}>
                        <input type="password" name="password" id='password'  value={password} onChange={onChange} required/>
                        <label>Password</label>
                    </div>
                    <div className={styles['input-box']}>
                        <input type="password" name="password2" id='password2'  value={password2} onChange={onChange} required/>
                        <label>Confirm Password</label>
                    </div>
                    <a href="" onClick={onSubmit} className={styles['submit']}>
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