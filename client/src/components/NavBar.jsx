import React, { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import styles from '../../styles/NavBar.module.scss'
import { FaUserAlt, FaHome, FaRegPlusSquare, FaRegChartBar, FaLayerGroup } from "react-icons/fa";
// import { AuthContext } from '../context/auth-context.js'
import NewHabit from '../../pages/newHabit.jsx'
import LoadingScreen from '../../pages/loading.jsx'

const NavBar = ({ currentIdx, showNewHabitForm, setShowNewHabitForm }) => {
    const router = useRouter();
    // const authContext = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState(currentIdx);
    const [loading, setLoading] = useState(false);
    // console.log(router.pathname)

    const MENU_LIST = [
        { href: '/dashboard'},
        { href: '/habits'},
        { href: '/newHabit'},
        { href: '/stats'},
        { href: '/settings'}
    ];

    const handleClick = (activeIdx) => {
        setLoading(true);
        if(router.pathname === MENU_LIST[activeIdx].href)
            return
        if(activeIdx === 2){
            setLoading(false);
            setShowNewHabitForm(true)
            setActiveTab(2)
        } else {
            router.push(MENU_LIST[activeIdx].href);
        }
    }

    if(loading)
        return <LoadingScreen/>

    return (
            <>
        <div className={styles.container}>
        { showNewHabitForm ? <NewHabit setShowNewHabitForm={setShowNewHabitForm}/> : null} 
            <div className={styles.navList}>
                <nav className={styles.navbar}>
                    <ul className={styles.iconList}>
                        <li className={styles.icons}>
                            <FaHome className={`${styles.icon} ${router.pathname === '/dashboard' && !showNewHabitForm ? styles.active : ""}`} onClick={() => handleClick(0)}/>
                        </li>
                        <li className={styles.icons}>
                            <FaLayerGroup className={`${styles.icon} ${router.pathname === '/habits' && !showNewHabitForm ? styles.active : ""}`} onClick={() => handleClick(1)}/>
                        </li>
                        <li className={styles.icons}>
                            <FaRegPlusSquare className={`${styles.icon} ${showNewHabitForm ? styles.active : ""}`} onClick={() => handleClick(2)}/>
                        </li>
                        <li className={styles.icons}>
                            <FaRegChartBar className={`${styles.icon} ${router.pathname === '/stats' && !showNewHabitForm ? styles.active : ""}`} onClick={() => handleClick(3)}/>
                        </li>
                        <li className={styles.icons}>
                            <FaUserAlt className={`${styles.icon} ${router.pathname === '/settings' && !showNewHabitForm ? styles.active : ""}`} onClick={() => handleClick(4)}/>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
        </>
    )
}

export default NavBar