import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from '../../styles/Settings.module.scss'
import { AuthContext, useAuth } from '../../src/contexts/auth-context.js'
import LoadingScreen from '../../pages/loading.jsx'

const account = () => {
  const { isUserAuthenticated, isLoading, user, updateUser } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: ''
  });
  const { first_name, last_name, email } = formData;

  useEffect(() => {
    if(user){
      setFormData({
        first_name: typeof(user.first_name) !== 'undefined' ? user.first_name : '',
        last_name: typeof(user.last_name) !== 'undefined' ? user.last_name : '',
        email: user.email
      })
    }
    console.log(user)
  
  }, [user]);


  const goBack = () => {
    setLoading(true)
    router.push('/settings')
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSave = async (e) => {
    // TODO: Add api call to update user info
    e.preventDefault();
    const userData = {
      user_id: user.user_id,
      first_name: first_name,
      last_name: last_name,
      email: email,
      token: user.token
    }
    await updateUser(userData);
    router.reload(window.location.pathname);
  }

  if(isLoading || loading)
    return <LoadingScreen/>

  return (
    <div className={styles["account"] + ' ' + styles["container"]}>
      <div className={styles["top"]}>
          <span className={styles.backBtnContainer}>
              <p className={styles["backBtn"]} onClick={goBack}>&larr;</p>
          </span>
          <h1 className={styles["title"]}>Account</h1>
      </div>

      <div className={styles["account"] + ' ' + styles["row"]}>
        <div className={styles["inputCol"]}>
          <label htmlFor="html">First Name</label>
          <input type="text" name="first_name" className={styles["first_name"]} value={first_name} onChange={onChange}/>
        </div>

        <div className={styles["inputCol"]}>
          <label htmlFor="html">Last Name</label>
          <input type="text" name="last_name" className={styles["last_name"]}  onChange={onChange} value={last_name}/>
        </div>
      </div>

      <div className={styles["inputCol"] + ' '+ styles["email"]}>
        <label htmlFor="html" className={styles["email_label"]}>Email</label>
        <input type="text" name="email" className={styles["email"]} onChange={onChange} value={email}/>
      </div>

      <div className={styles["account"] + ' ' + styles["row"]}>
        <Link onClick={() => setLoading(true)} className={styles['change_pwd']} href="/settings/protectedReset">
          Change Password
        </Link>

        <button className={styles["account_save"]} onClick={handleSave}>
          Save Changes
        </button>
      </div>

    </div>
  )
}

export default account