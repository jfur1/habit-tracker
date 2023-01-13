import React, { useState, useEffect, useContext, createContext } from "react";
import LoadingScreen from '../../pages/loading.jsx'

const AuthContext = React.createContext({
    user: {},
    setUser: () => {},
    isAuthenticated : false,
    isLoading: false,
});

const { Provider } = AuthContext;

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        async function loadUserFromCookies() {
            let user
            // Check for cached user in session
            if (typeof window !== 'undefined')
                user = JSON.parse(localStorage.getItem('user'))
                
            if (user) {
                // console.log("Got a user from the cookies", user)
                setUser(user);
            }
            setLoading(false)
        }
        loadUserFromCookies()
    }, [])

    // Returns a boolean value
    const isUserAuthenticated = () => {
        let cookie
        if (typeof window !== 'undefined')
            cookie = JSON.parse(localStorage.getItem('user'));
        setLoading(false)

        console.log("isUserAuthenticated? :", (cookie || user) ? true : false)
        // Check if token exists in local storage or the current state
        if(cookie || user)
            return true;
        else
            return false;
    }


    return (
        <Provider
            value={{
                user,
                isLoading,
                setUser,
                isUserAuthenticated,
            }}
        >
            {children}
        </Provider>
    );
};

export const useAuth = () => useContext(AuthContext);