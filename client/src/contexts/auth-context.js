import React, { useState, useEffect, useContext, createContext } from "react";
import { useRouter } from "next/router";
import LoadingScreen from '../../pages/loading.jsx'
import Axios from 'axios';
import { useThemeContext } from './theme-context.js'

const AuthContext = React.createContext({
    user: {},
    setUser: () => {},
    isAuthenticated : false,
    isLoading: false,
});

const { Provider } = AuthContext;

export const AuthProvider = ({ children }) => {
    const router = useRouter();
    const { setTheme } = useThemeContext();
    const [user, setUser] = useState(null)
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        async function loadUserFromCookies() {
            let user
            // Check for cached user in session
            if (typeof window !== 'undefined')
                user = JSON.parse(localStorage.getItem('user'))
                
            if (user) {
                console.log("Got a user from the cookies", user)
                setUser(user);
                setTheme(user.theme)
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

    const registerUser = async(userData) => {
        try {
            const res = await Axios.post(process.env.API_URL + 'register', userData);
            // console.log("RES:", res)
            setLoading(false);
            return res;

        } catch (error) {
            console.log(error);
            alert('Server error while trying to register. Please try again!');
            setLoading(false);
        }
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
                theme: res.data.theme,
                token: res.data.token
            }
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
            setLoading(false);
            setTheme(user.theme)
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

    const forgotPassword = async (email) => {
        try {
            const res = await Axios.post(process.env.API_URL + 'forgot', {email});
            console.log("forgot RES:", res)
            setLoading(false);
            return res.data;
        } catch (error) {
            console.log(error);
            alert('Could not set new password. Please try again!');
            setLoading(false);
        }
    }

    const validateResetToken = async (data) => {
        try {
            const res = await Axios.get(process.env.API_URL + 'reset/' + data.id + "/" + data.token);
            // console.log("resetPassword RES:", res)
            setLoading(false);
            return res
        } catch (error) {
            // console.log(error);
            setLoading(false);
            return { status: 400, msg: 'Could not validate token. Please request a new reset link!' }
        }
    }

    const resetPassword = async (data) => {
        try {
            const res = await Axios.post(process.env.API_URL + 'reset/' + data.id + "/" + data.token, { password: data.password });
            console.log("resetPassword RES:", res)
            setLoading(false);
            return res
        } catch (error) {
            console.log(error);
            setLoading(false);
            return { status: 400, msg: 'Server error while resetting password. Please try again!' }
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
                registerUser,
                updateUser,
                updatePassword,
                forgotPassword,
                validateResetToken,
                resetPassword,
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