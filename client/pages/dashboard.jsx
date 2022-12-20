import React, { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/Dashboard.module.scss'
import NavBar from '../src/components/NavBar.jsx'
import {AuthContext, useAuth} from '../src/contexts/auth-context.js'

const dashboard = () => {
    const router = useRouter();
    const { isUserAuthenticated, loading, user } = useAuth();

    const TodaysDate = () => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', "Oct", 'Nov', 'Dec'];
        const today = new Date(); 

        return (
            <div className={styles.title}>
                <h1 className={styles.date}>{months[today.getMonth()]} {today.getDate()}</h1>
                <p>Lorem Ipsum</p>
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
    
    return (
        <div className={styles.main}>
            <TodaysDate/>
            <WeeklyRow/>
            
            
            <NavBar currentIdx={0}/>
        </div>
    )
}

export default dashboard