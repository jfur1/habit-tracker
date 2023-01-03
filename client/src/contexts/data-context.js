import React, { useState, useEffect, useContext, createContext } from "react";
import { useRouter } from "next/router";
import Axios from 'axios';
import LoadingScreen from '../../pages/loading.jsx'
import { AuthContext, useAuth } from './auth-context.js'

const DataContext = React.createContext({});

const { Provider } = DataContext;

export const DataProvider = ({ children }) => {
    const [userData, setUserData] = useState(null)
    const [entries, setEntries] = useState(null)
    const [userDataLoading, setUserDataLoading] = useState(true)
    const { isUserAuthenticated, isLoading, user } = useAuth();

    useEffect(() => {
        const getHabits = async () => {
            const headers = {
              "Authorization": "Bearer " + user.token,
              "Content-Type": 'application/json'
            }
            const res = await Axios.get(process.env.API_URL + `habits/all/` + user.user_id, {
              headers: headers
            });
            
            setUserDataLoading(false);

            return res;
        }
        const getEntries = async () => {
            const headers = {
              "Authorization": "Bearer " + user.token,
              "Content-Type": 'application/json',
              "id": user.user_id
            }
            const res = await Axios.get(process.env.API_URL + `entries`, {
              headers: headers
            });
      
            return res;
        }

        if(user){
            console.log("Received user from context: ", user)
            getHabits().then((response) => {
                if(response.status === 200){
                    console.log('Returned the following habits:', response.data)
                    setUserData(response.data);
                }
            })

            getEntries().then((entryRes) => {
                if(entryRes.status === 200 || entryRes.status === 201){
                    console.log('Returned the following Entries:', entryRes.data)
                    setEntries(entryRes.data);
                }
            })
            setUserDataLoading(false);
        }
    }, [])

    return (
        <Provider
            value={{
                userData,
                setUserData,
                entries,
                setEntries,
                userDataLoading,
                setUserDataLoading
            }}
        >
            {children}
        </Provider>
    );
}

export const useDataContext = () => useContext(DataContext);
