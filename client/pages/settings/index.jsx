
import React, { useEffect, useState, useContext } from 'react'
import Link from "next/link";
import { useRouter } from 'next/router'
import NavBar from '../../src/components/NavBar.jsx'
import styles from '../../styles/Settings.module.scss'
import { AuthContext, useAuth } from '../../src/contexts/auth-context.js'
import { AiOutlineRight, AiOutlineBell, AiOutlineInfoCircle } from 'react-icons/ai'
import { CgDarkMode } from 'react-icons/cg'
import { FiUser, FiHeadphones } from 'react-icons/fi'
import { TfiLock } from "react-icons/tfi";
import { MdLogout } from "react-icons/md";
import LoadingScreen from '../../pages/loading.jsx'

const settings = () => {
  const router = useRouter();
  const { isUserAuthenticated, isLoading, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showNewHabitForm, setShowNewHabitForm] = useState(false);

  const logout = () => {
    setLoading(true);
    localStorage.removeItem('user');
    router.push('/');
  }

  if(isLoading || loading)
    return <LoadingScreen/>

  return (
    <div className={styles.main}>

        <div className={styles["top"]}>
            <h1 className={styles["title"]}>Settings</h1>
        </div>

        <ul className={styles["list"]}>
            <Link href={'/settings/account'}>
                <li className={styles["item"]}>
                <FiUser className={styles['icon']}/>
                <p className={styles["label"]}>Account</p>
                <AiOutlineRight className={styles["rarr"]}/>
                </li>
            </Link>

            <Link href={'/settings/appearance'}>
                <li className={styles["item"]}>
                <CgDarkMode className={styles['icon']}/>
                <p className={styles["label"]}>Appearance</p>
                <AiOutlineRight className={styles["rarr"]}/>
                </li>
            </Link>

            <Link href={'/settings/notifications'}>
                <li className={styles["item"]}>
                <AiOutlineBell className={styles['icon']}/>
                <p className={styles["label"]}>Notifications</p>
                <AiOutlineRight className={styles["rarr"]}/>
                </li>
            </Link>

            <Link href={'/settings/privacy'}>
                <li className={styles["item"]}>
                <TfiLock className={styles['icon']}/>
                <p className={styles["label"]}>Privacy & Security</p>
                <AiOutlineRight className={styles["rarr"]}/>
                </li>
            </Link>

            <Link href={'/settings/help'}>
                <li className={styles["item"]}>
                <FiHeadphones className={styles['icon']}/>
                <p className={styles["label"]}>Help & Support</p>
                <AiOutlineRight className={styles["rarr"]}/>
                </li>
            </Link>

            <Link href={'/settings/about'}>
                <li className={styles["item"]}>
                <AiOutlineInfoCircle className={styles['icon']}/>
                <p className={styles["label"]}>About</p>
                <AiOutlineRight className={styles["rarr"]}/>
                </li>
            </Link>

            <li className={styles["item"]} onClick={logout}>
            <MdLogout className={styles['icon']} style={{ color: 'red' }}/>
            <p className={styles["label"]}>Logout</p>
            </li>

        </ul>
        <NavBar currentIdx={4} showNewHabitForm={showNewHabitForm} setShowNewHabitForm={setShowNewHabitForm}/>
    </div>
    
  )
}

export default settings