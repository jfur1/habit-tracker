import React, { useState, useEffect, useContext, createContext } from "react";
import { useRouter } from "next/router";
import Axios from 'axios';
import LoadingScreen from '../../pages/loading.jsx'
import { AuthContext, useAuth } from './auth-context.js'

const DataContext = React.createContext({});

const { Provider } = DataContext;

export const DataProvider = ({ children }) => {
    const [userData, setUserData] = useState(null)
    const [userDataLoading, setLoading] = useState(true)
    const { isUserAuthenticated, isLoading, user } = useAuth();

    useEffect(() => {
        const getData = async () => {
            const headers = {
              "Authorization": "Bearer " + user.token,
              "Content-Type": 'application/json'
            }
            const res = await Axios.get(process.env.API_URL + `habits/` + user.user_id, {
              headers: headers
            });

            return res;
        }
    

        if(user){
            console.log("Received user from context: ", user)
            getData().then((response) => {
                if(response.status === 200){
                console.log('Returned the following habits:', response.data)
                setHabits(response.data);
                setUserData(response.data);
                }
            })
        }
    }, [])

    return (
        <Provider
            value={{
                userData,
                setUserData,
                userDataLoading
            }}
        >
            {children}
        </Provider>
    );
}

export const useDataContext = () => useContext(DataContext);
