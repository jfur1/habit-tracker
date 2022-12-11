import React, { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { AuthContext } from '../src/context/auth-context.js'
import styles from '../styles/Dashboard.module.scss'
import NavBar from '../src/components/NavBar.jsx'

const dashboard = () => {
    const router = useRouter();
    const authContext = useContext(AuthContext);

    useEffect(() => {
        console.log('Auth Status:', authContext.isUserAuthenticated())

        // checks if the user is authenticated
        authContext.isUserAuthenticated()
        ? router.push("/dashboard")
        : router.push("/");
    }, [])
    
    return (
        <>
        <div className={styles.main}>dashboard
            
        </div>
        <NavBar currentIdx={0}/>
        </>
    )
}

export default dashboard