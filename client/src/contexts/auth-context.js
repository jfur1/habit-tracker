import React, { useState, useEffect, useContext, createContext } from "react";
import { useRouter } from "next/router";
import LoadingScreen from '../../pages/loading.jsx'
import Axios from 'axios';

const AuthContext = React.createContext({
    user: {},
    setUser: () => {},
    isAuthenticated : false,
    isLoading: false,
});

const { Provider } = AuthContext;

export const AuthProvider = ({ children }) => {
    const router = useRouter();
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
        setLoading(false);

        console.log("isUserAuthenticated? :", (cookie || user) ? true : false)
        // Check if token exists in local storage or the current state
        if(cookie || user)
            return true;
        else
            return false;
    }

    const updateUser = async (userData) => {
        // console.log("userData", userData)
        // console.log("user", user)
        const headers = {
            "Authorization": "Bearer " + userData.token,
            "Content-Type": 'application/json',
            "id": userData.user_id
        }
        try {
            const res = await Axios.post(process.env.API_URL + 'update', userData, {headers});
            // console.log("RES:", res)
            const user = {
                user_id: res.data.user_id,
                first_name: res.data.first_name,
                last_name: res.data.last_name,
                email: res.data.email,
                token: res.data.token
            }
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
            setLoading(false);

        } catch (error) {
            console.log(error);
            alert('Incorrect username/password combination!');
            setLoading(false);
        }
    }

    const userLogin = async (userData) => {
        setLoading(true);
        try {
            const res = await Axios.post(process.env.API_URL + 'login', userData);
            // console.log("RES:", res)
            const user = {
                first_name: res.data.first_name,
                last_name: res.data.last_name,
                user_id: res.data.user_id,
                email: res.data.email,
                token: res.data.token
            }
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
            setLoading(false);
            router.push('/dashboard');
        } catch (error) {
            console.log(error);
            alert('Incorrect username/password combination!');
            setLoading(false);
        }
    }

    const updatePassword = async (userData) => {
        const { token, user_id, password } = userData;
        const headers = {
            "Authorization": "Bearer " + token,
            "Content-Type": 'application/json',
            "id": user_id
        }
        try {
            const res = await Axios.post(process.env.API_URL + 'password', userData, {headers});
            // console.log("RES:", res)
            setLoading(false);
            return res.data;
        } catch (error) {
            console.log(error);
            alert('Could not set new password. Please try again!');
            setLoading(false);
        }
    }

    const userLogout = async () => {
        localStorage.removeItem('user');
        setUser(null);
        return;
    }

    return (
        <Provider
            value={{
                user,
                isLoading,
                setLoading,
                setUser,
                updateUser,
                updatePassword,
                isUserAuthenticated,
                userLogin,
                userLogout
            }}
        >
            {children}
        </Provider>
    );
};

export const useAuth = () => useContext(AuthContext);