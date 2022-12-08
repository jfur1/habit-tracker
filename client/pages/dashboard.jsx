import React, { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { AuthContext } from '../src/context/auth-context.js'

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

    const logout = () => {
      localStorage.removeItem('user');
      router.push('/');
    }
    
    return (
        <div>dashboard
            <button onClick={logout}>Sign Out</button>
        </div>
    )
}

export default dashboard