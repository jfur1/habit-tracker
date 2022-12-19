import React, { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/Dashboard.module.scss'
import NavBar from '../src/components/NavBar.jsx'
import {AuthContext, useAuth} from '../src/contexts/auth-context.js'

const dashboard = () => {
    const router = useRouter();
    const { isUserAuthenticated, loading, user } = useAuth();
    // console.log('isUserAuthenticated: ', isUserAuthenticated())
    // console.log('isLoading: ', loading)
    // console.log('user: ', user)
    
    return (
        <>
        <div className={styles.main}>dashboard
            
        </div>
        <NavBar currentIdx={0}/>
        </>
    )
}

export default dashboard