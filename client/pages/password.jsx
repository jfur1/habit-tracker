import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from '../styles/Settings.module.scss'
import { AuthContext, useAuth } from '../src/contexts/auth-context.js'

const password = () => {
    const { isUserAuthenticated, loading, setUser, user, userLogin, updatePassword } = useAuth();
    const router = useRouter();

    const [formErrors, setFormErrors] = useState({})
    const [wasUpdated, setWasUpdated] = useState(false)
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

    const validate = () => {
        var errors = new Map();

        if(!password || !password2)
            errors.set('blank', 'Please fill all required fields!')

        if(password !== password2)
            errors.set('match', 'Passwords do not match!')
        
        if(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password) === false
        || /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password2) === false)
            errors.set('regex', 'Password must be at least 8 characters, and contain at least one letter and one number.')
        
        return errors
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        var errs = validate();
        const userData = {
            token: user.token,
            user_id: user.user_id,
            password: password
        }
        if(errs.size > 0){
            console.log(errs);
            setFormErrors(errs);
            return;
        } else {
            const res = await updatePassword(userData);
            if(res){
                setFormErrors({});
                setWasUpdated(true);
            }
        }
    }

    const SuccessBanner = () => {
        return <p className="success">Updated password successfully.</p>
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
        <div className={styles["change_password"] + ' ' + styles["container"]}>
            <div className={styles.top}>
                <span className={styles.backBtnContainer}>
                    <Link className={styles["backBtn"]} href={'/settings/account'}>&larr;</Link>
                </span>
                <h1 className={styles["title"]}>Change Password</h1>
            </div>

            {formErrors.size > 0 
                ? <ErrorsBanner/>
                : null
            }

            {wasUpdated 
            ? <SuccessBanner/>
            :<form>
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
            </form>}
        </div>
    )
}

export default password