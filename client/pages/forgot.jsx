import React, { useState } from 'react'
import Link from 'next/link'
import styles from '../styles/Settings.module.scss'
import LoadingScreen from '../pages/loading.jsx'
import { AuthContext, useAuth } from '../src/contexts/auth-context.js'

const forgot = () => {
    const [wasUpdated, setWasUpdated] = useState(false)
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState({})
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
            setErrors({});
            setWasUpdated(true);
        }
    }

    const SuccessBanner = () => {
        return (
            <>
            <p className="success">Check your email</p>
            <p className="subtext">We've sent instructions to:</p>
            <p className="email">{email}</p>
            <span className="spam">If it doesn't arrive soon, check your spam folder or <a>send another email.</a></span>
            
            <p className="contact">Need help?</p>
            <a className="support">Contact support.</a>

            <Link href="/">Back to sign-in.</Link>
            </>
        )
    }


    const ErrorsBanner = () => {
        return (
            <div className={styles["errors"]}>
                <p className={styles["title"]}>Found the following errors:</p>
                {Array.from(errors, ([k,v]) => 
                    <p key={'error.' + k} className={styles["error"]}>&bull; {v}</p>
                )}
            </div>
        )
    }


    return (
        <div className={styles["forgot_password"] + ' ' + styles["container"]}>
            <div className={styles.top}>
                    <span className={styles.backBtnContainer}>
                        <Link className={styles["backBtn"]} href={'/'}>&larr;</Link>
                    </span>
                    <h1 className={styles["title"]}>Change Password</h1>
            </div>


            {errors.size > 0 
                ? <ErrorsBanner/>
                : null
            }

            {wasUpdated 
            ? <SuccessBanner/>
            : 
            <>
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
            </>
            }
        </div>
    )
}

export default forgot