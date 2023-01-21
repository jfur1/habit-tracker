import React, { useState } from 'react'
import Link from 'next/link'
import styles from '../styles/NotFound.module.scss'
import LoadingScreen from '../pages/loading.jsx'
import { useAuth } from '../src/contexts/auth-context.js'

const NotFound = () => {
    const { isUserAuthenticated, isLoading, user } = useAuth();
    const [loading, setLoading] = useState(false);

    if(isLoading || loading)
        return <LoadingScreen/>

    // console.log("isUserAuthenticated:", isUserAuthenticated())
    return (
        <div className={styles["main"]}>
            <div className={styles.top}>
                <span className={styles.backBtnContainer}>
                    {isUserAuthenticated()
                    ? <Link className={styles["backBtn"]} href={'/dashboard'}>&larr;</Link>
                    : <Link className={styles["backBtn"]} href={'/'}>&larr;</Link>}
                    
                </span>
                <h1 className={styles["title"]}>404 Page Not Found</h1>
            </div>
        </div>
    )
}

export default NotFound