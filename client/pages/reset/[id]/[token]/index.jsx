import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { AuthContext, useAuth } from '../../../../src/contexts/auth-context.js'
import styles from '../../../../styles/Settings.module.scss'

const index = () => {
    const router = useRouter()
    const id = router.query.id;
    const token = router.query.token;
    const { validateResetToken, resetPassword, isLoading } = useAuth();

    // console.log('id' , router.query.id)
    // console.log('token' , router.query.token)
    const [formErrors, setFormErrors] = useState({})
    const [wasUpdated, setWasUpdated] = useState(false)
    const [formData, setFormData] = useState({
        password: '',
        password2: ''
    });
    const { password, password2 } = formData;

    useEffect(() => {
        const validateToken = async() => {
            const data = { id, token }
            var errs = new Map();

            const res = await validateResetToken(data);
            if(res.status === 200){
                // Valid JWT
                console.log("validateResetToken response: ", res)
                return;

            } else {
                // Invalid JWT -- prompt back to /forgot page
                console.log(res.msg)
                errs.set('invalid', res.msg.toString())
                setFormErrors(errs);
                return;
            }
        }
        if(id && token){
            const res = validateToken();
        }
    }, [id, token])

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
            token: token,
            id: id,
            password: password
        }
        if(errs.size > 0){
            console.log(errs);
            setFormErrors(errs);
            return;
        } else {
            const res = await resetPassword(userData);
            console.log('res:', res)
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
        <div className={styles["change_password"] + ' ' + styles["container"]}>
            <div className={styles.top}>
                <span className={styles.backBtnContainer}>
                    <Link className={styles["backBtn"]} href={'/'}>&larr;</Link>
                </span>
                <h1 className={styles["title"]}>Reset Password</h1>
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

export default index