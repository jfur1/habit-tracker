import React, { useState, useEffect, useContext, createContext } from "react";
import { useRouter } from "next/router";
import Axios from 'axios';
import LoadingScreen from '../../pages/loading.jsx'
import { AuthContext, useAuth } from './auth-context.js'

const DataContext = React.createContext({
    ctxHabits: [],
    ctxEntries: [],
    userDataLoading: false,
    getHabit: () => {},
    getEntriesForHabit: () => {}
});

const { Provider } = DataContext;

export const DataProvider = ({ children }) => {
    const [ctxHabits, setHabits] = useState(null)
    const [ctxEntries, setEntries] = useState(null)
    const [userDataLoading, setUserDataLoading] = useState(true)
    const { isUserAuthenticated, isLoading, user } = useAuth();

    useEffect(() => {
        const getHabits = async () => {     // Fetch data from external API
            const headers = {
              "Authorization": "Bearer " + user.token,
              "Content-Type": 'application/json',
              "id": user.user_id
            };
            try {
                const res = await Axios.get(process.env.API_URL + `habits`, {headers});
                setHabits(res.data);
                return;
            } catch (error) {
                console.log("Error: ", error)
                router.push('/login')
            }
          }
          const getEntries = async () => {
            const headers = {
              "Authorization": "Bearer " + user.token,
              "Content-Type": 'application/json',
              "id": user.user_id
            }
            try {
                const res = await Axios.get(process.env.API_URL + `entries`, {headers});
                setEntries(res.data);
                return;
            } catch (error) {
                console.log("Error: ", error)
                router.push('/login')
            }
          }

        if(user){
            getHabits()
            getEntries()
            setUserDataLoading(false);
        }
    }, [user])

    const getHabit = async ({ user, id }) => {
        const headers = {
            "Authorization": "Bearer " + user.token,
            "Content-Type": 'application/json',
            "id": user.user_id
          }
        try {
            const res = await Axios.get(process.env.API_URL + 'habits/' + id, {headers})
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    const getEntriesForHabit = async ({ user, id }) => {
        const headers = {
            "Authorization": "Bearer " + user.token,
            "Content-Type": 'application/json',
            "id": user.user_id
          }
        try {
            const res = await Axios.get(process.env.API_URL + 'entries/' + id, {headers})
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    const deleteHabit = async() => {
        const headers = {
          "Authorization": "Bearer " + user.token,
          "Content-Type": 'application/json',
          "id": user.user_id
        };
        try {
            const res = await Axios.delete(process.env.API_URL + 'habits/' + habitID, {headers})
            router.push('/habits');
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Provider
            value={{
                ctxHabits,
                setHabits,
                ctxEntries,
                setEntries,
                userDataLoading,
                setUserDataLoading,
                getHabit,
                getEntriesForHabit,
                deleteHabit
            }}
        >
            {children}
        </Provider>
    );
}

export const useDataContext = () => useContext(DataContext);
