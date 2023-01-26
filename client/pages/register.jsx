import React, { useState } from 'react'
import Axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../styles/Register.module.scss'
import { AuthContext, useAuth } from '../src/contexts/auth-context.js'

const register = () => {
    const router = useRouter()
    const { registerUser, isLoading } = useAuth();
    const [wasUpdated, setWasUpdated] = useState(false)
    const [formErrors, setFormErrors] = useState({})
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

    const validate = () => {
        var errors = new Map();

        if(!password || !password2)
        errors.set('blank', 'Please fill all required fields!')

        if(password !== password2)
            errors.set('match', 'Passwords do not match!')

        if ((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) === false)
            errors.set('regex', 'Password must be at least 8 characters, and contain at least one letter and one number.')

        return errors
    }

    
    const onSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            email,
            password,
        }

        var errs = validate();
        if(errs.size > 0){
            console.log(errs);
            setFormErrors(errs);
            return;
        }
        else {
            const res = await registerUser(userData);
            console.log("res:", res);
            if(res.status === 201){
                setFormErrors({});
                setWasUpdated(true);
            } else {
                console.log(res.msg)
                errs.set('invalid', res.msg.toString())
                setFormErrors(errs);
                return;
            }
        }
    }
    const goBack = () => {
        router.push('/')
    }

    const SuccessBanner = () => {
        return (
            <>
            <p className="success">Updated password successfully.</p>
            <Link href="/" className="goToLogin">Return to Login</Link>
            </>
        )
    }

    const ErrorsBanner = () => {
        return (
            <div className={styles["errors"]}>
                <p className={styles["title"]}>Found the following errors:</p>
                {Array.from(formErrors, ([k,v]) => 
                    <p key={'error.' + k} className={styles["error"]}>&bull; {v}</p>
                )}
            </div>
        )
    }


    return (
        <div className={styles['container']}>
            <div className={styles.top}>
                <span className={styles.backBtnContainer}>
                    <p className={styles["backBtn"]} onClick={goBack}>&larr;</p>
                </span>
                <h1 className={styles["title"]}>Register</h1>
            </div>


            {formErrors.size > 0 
                ? <ErrorsBanner/>
                : null
            }


            {wasUpdated 
            ? <SuccessBanner/>
            : <div className={styles['register-box']}>
                <form  onSubmit={onSubmit}>
                    <div className={styles['input-box']}>
                        <input type="text" name="email" id='email' value={email} onChange={onChange} required/>
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
            </div>}
        </div>
    )
}

export default register