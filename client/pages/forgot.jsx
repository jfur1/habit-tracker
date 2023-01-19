import React, { useState } from 'react'
import Link from 'next/link'
import styles from '../styles/Settings.module.scss'
import LoadingScreen from '../pages/loading.jsx'
import { AuthContext, useAuth } from '../src/contexts/auth-context.js'

const forgot = () => {
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState(null)
    const { forgotPassword, isLoading } = useAuth();

    if(isLoading)
        return <LoadingScreen/>


    const onSubmit = async(e) => {
        e.preventDefault();
        var errs = new Map();
        console.log(email)
        if ((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) === false){
            errs.set('invalid', 'Please enter a valid email address.');
            console.log('err')
            setErrors(errs);
            return;
        }

        const res = await forgotPassword(email);
        console.log('Client side res: ', res);
        if(res){
            console.log('success!')
        }
    }

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
                <button className={styles["submit"]} onClick={onSubmit}>
                    Send Instructions
                </button>
            </div>

        </div>
    )
}

export default forgot