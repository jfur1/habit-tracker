import React, { useState, useEffect, useContext } from 'react'
import Axios from 'axios'
import { useRouter } from 'next/router'
import styles from '../styles/Dashboard.module.scss'
import NavBar from '../src/components/NavBar.jsx'
import { AuthContext, useAuth } from '../src/contexts/auth-context.js'
import { DataContext, useDataContext } from '../src/contexts/data-context.js'
import LoadingScreen from './loading.jsx'
import ToDoCard from '../src/components/ToDoCard.jsx'
import CircleSlider from '../src/components/CircleSlider.jsx'

const dashboard = () => {
    const router = useRouter();
    const { isUserAuthenticated, isLoading, user } = useAuth();
    const { userDataLoading, setUserData, userData } = useDataContext();

    const [isOpen, setIsOpen] = useState(null);
    const [entries, setEntries] = useState(null);
    const [habits, setHabits] = useState(null);
    const [numerator, setNumerator] = useState(0);
    const [todaysCount, setTodaysCount] = useState(null);
    useEffect(() => {
        // Get all existing habits once we receive user from the context
    
        const getHabits = async () => {
          const headers = {
            "Authorization": "Bearer " + user.token,
            "Content-Type": 'application/json',
            "id": user.user_id
          }
          const res = await Axios.get(process.env.API_URL + `habits`, {
            headers: headers
          });
    
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
                setHabits(response.data);
            } else{
                router.push('/login')
            }
          })
          getEntries().then((entryRes) => {
            if(entryRes.status === 200 || entryRes.status === 201){
                console.log('Returned the following Entries:', entryRes.data)
                setEntries(entryRes.data);
            } else{
                router.push('/login')
            }
          })
        }

      }, [user]);

    const TodaysDate = ( ) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', "Oct", 'Nov', 'Dec'];
        const today = new Date(); 

        return (
            <div className={styles.title}>
                <h1 className={styles.date}>
                    {months[today.getMonth()]} {today.getDate()}
                </h1>
                <p className={styles.msg}>Lorem Ipsum</p>
            </div>
        )
    }

    const WeeklyRow = () => {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
        const currentDate = today.getDate();
        const currentDay = today.getDay();

        var baseDate = new Date();
        baseDate.setDate(today.getDate() - 3);
    
        const weekdays = [];
        for(let i = 0; i < 7; i++){
            weekdays.push({ date: baseDate.getDate(), day: baseDate.getDay()});
            baseDate.setDate(baseDate.getDate() + 1);
        }

        return (
            <ul className={styles.weeklyRow}>
                {weekdays.map((data, idx) => 
                    <li key={idx} className={idx === 3 ? styles.today : ''}>
                        <p className={styles.day}>{days[data.day]}</p>
                        <p className={styles.date}>{data.date}</p>
                    </li>
                )}
            </ul>
        )
    }

    // Returns ToDoCard for each habit that occurs today
    const TodaysHabits = ({ habits }) => {
        const today = new Date();
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        const dow = today.getDay();
        const currentDayName = days[dow];

        // Pad month & date if needed
        const monthIdx = (today.getMonth() <= 8) ? ('0'+ (today.getMonth() + 1)): (today.getMonth() + 1)
        const dayIdx = (today.getDate() <= 9) ? ('0'+ today.getDate()) : today.getDate()
        
        // Use ymdStamp as key
        const currentYmd = today.getFullYear() + '-' + monthIdx + '-' + dayIdx
        // console.log('Currrent ymd: ', currentYmd)

        return (
            <div className={styles.habitsList}>
                {habits.map((habit, idx) => {
                    if(habit.schedule.indexOf(currentDayName) >= 0){
                        
                        const [habitEntry] = entries?.filter((entry, idx) => entry.habit_id === habit.habit_id)

                        console.log('Habit Entry: ', habitEntry)

                        return (
                            <ToDoCard entry={habitEntry} key={idx} habit={habit} isOpen={isOpen} setIsOpen={setIsOpen}/>
                        )
                    }
                })}
            </div>
        )
    }


    if(isLoading )
        return <LoadingScreen/>
    
    return (
        <div className={styles.main}>

            <TodaysDate todaysCount={todaysCount}/>
            <WeeklyRow/>

            {/* <div className={styles["listToggle"]}>
                <p>Active</p>
                <p>Completed</p>
            </div> */}

            <div className={styles.listContainer}>
                { habits 
                    ? <TodaysHabits todaysCount={todaysCount} setTodaysCount={setTodaysCount} habits={habits}/> 
                    : null
                }
            </div>
            <NavBar currentIdx={0}/>
        </div>
    )
}

export default dashboard