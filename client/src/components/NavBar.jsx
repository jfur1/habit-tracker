import React, { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import styles from '../../styles/NavBar.module.scss'
import { FaUserAlt, FaHome, FaRegPlusSquare, FaRegChartBar, FaLayerGroup } from "react-icons/fa";
import { AuthContext } from '../../src/context/auth-context.js'


const NavBar = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState(0);
    const authContext = useContext(AuthContext);

    const MENU_LIST = [
        { href: '/dashboard'},
        { href: '/habits'},
        { href: '/newHabit'},
        { href: '/stats'},
        { href: '/settings'},
    ]

    const handleClick = (activeIdx) => {
        setActiveTab(activeIdx)
        router.push(MENU_LIST[activeIdx].href);
    }

    return (
        authContext.isUserAuthenticated()
        ?
        <div className={styles.container}>
            <div className={styles.navList}>
                <nav className={styles.navbar}>
                    <ul className={styles.iconList}>
                        <li className={styles.icons}>
                            <FaHome className={styles.icon} onClick={() => handleClick(0)}/>
                        </li>
                        <li className={styles.icons}>
                            <FaLayerGroup className={styles.icon} onClick={() => handleClick(1)}/>
                        </li>
                        <li className={styles.icons}>
                            <FaRegPlusSquare className={styles.icon} onClick={() => handleClick(2)}/>
                        </li>
                        <li className={styles.icons}>
                            <FaRegChartBar className={styles.icon} onClick={() => handleClick(3)}/>
                        </li>
                        <li className={styles.icons}>
                            <FaUserAlt className={styles.icon} onClick={() => handleClick(4)}/>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
        : null
    )
}

export default NavBar