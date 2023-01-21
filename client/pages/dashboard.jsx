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
    const { isUserAuthenticated, isLoading, user, setUser } = useAuth();
    const { ctxHabits, ctxEntries, userDataLoading, setUserData, userData } = useDataContext();

    const [isOpen, setIsOpen] = useState(null);
    const [entries, setEntries] = useState(null);
    const [habits, setHabits] = useState(null);
    const [numerator, setNumerator] = useState(0);
    const [todaysCount, setTodaysCount] = useState(null);
    const [activeToggle, setActiveToggle] = useState(1);
    const [showNewHabitForm, setShowNewHabitForm] = useState(false);

    // TODO: Remove local hooks and just use context values
    useEffect(() => {
        setEntries(ctxEntries);
        setHabits(ctxHabits);
        console.log(habits, entries)
    }, [ctxEntries, ctxHabits]);

    const TodaysDate = ( ) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', "Oct", 'Nov', 'Dec'];
        const today = new Date(); 

        return (
            <div className={styles.title}>
                <h1 className={styles.date}>
                    {months[today.getMonth()]} {today.getDate()}
                </h1>
                <p className={styles.msg}>
                    {user?.first_name !== null 
                        ? "Welcome back " + user.first_name + "!" 
                        : 'Carpe Diem!'}
                </p>
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
    const TodaysHabits = () => {
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

        const data = habits.map((habit, idx) => {
            if(habit.schedule.indexOf(currentDayName) >= 0){
                
                var habitEntry = entries?.filter((entry, idx) => (
                        entry.habit_id === habit.habit_id
                        && entry.ymd.split('T')[0] === currentYmd
                ))
                
                if(typeof(habitEntry) !== 'undefined' && habitEntry !== [])
                    habitEntry = habitEntry[0]

                return (
                    <ToDoCard entry={habitEntry} key={idx} habit={habit} isOpen={isOpen} setIsOpen={setIsOpen}/>
                )
            }
        })
        // console.log(typeof(data[0]) === 'undefined')
        return (
            typeof(data[0]) === 'undefined'
                ? <p>No habits to track for today!</p>
                : data
            
        )
    }

    const NewUserPrompt = () => {
        return(
            <div className={styles['prompt']}>
                <h2 className={styles["title"]}>Welcome to Habit Tracker!</h2>
                <span className={styles["row"]}>
                    <p className={styles["desc"]}>To get started,&nbsp;</p>
                    <p className={styles["firstHabitLink"]} onClick={() => setShowNewHabitForm(true)}>create a new habit to track.</p>
                </span>
            </div>
        )
    }
    
    if(isLoading || userDataLoading)
        return <LoadingScreen/>
    
    return (
        <div className={styles.main}>

            <TodaysDate todaysCount={todaysCount}/>
            <WeeklyRow/>

            {/* <div className={styles["col"]}>
                <div className={styles["listToggle"]}>
                    <p onClick={() => setActiveToggle(1)} className={styles["inProgress"] + ' ' + (activeToggle === 1 ? styles['active'] : '')}>In Progress</p>
                    <p onClick={() => setActiveToggle(2)} className={styles["completed"] + ' ' + (activeToggle === 2 ? styles['active'] : '')}>Completed</p>
                </div>
            </div> */}

            { (entries === null || entries.length === 0) && (habits === null || habits.length === 0)
            ? <NewUserPrompt/>
            : 
                <div className={styles.listContainer}>
                    <TodaysHabits todaysCount={todaysCount} setTodaysCount={setTodaysCount} habits={habits}/> 
                </div>
            }
            <NavBar currentIdx={0} showNewHabitForm={showNewHabitForm} setShowNewHabitForm={setShowNewHabitForm}/>
        </div>
    )
}

export default dashboard