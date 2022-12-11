import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import NavBar from '../components/NavBar.jsx'
import { AuthContext } from '../context/auth-context.js'

const Layout = ({ children }) => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const authContext = useContext(AuthContext);

    useEffect(() => {
        console.log('Auth Status:', authContext.isUserAuthenticated())
        // checks if the user is authenticated
        setIsLoggedIn(authContext.isUserAuthenticated())
    }, [isLoggedIn])

    return (
        <>
            <main>{children}</main>
            { isLoggedIn ? <NavBar/> : null}
        </>
    )
}

export default Layout