import React, { useEffect, useState } from 'react'
import styles from '../../../styles/StatOverview.module.scss'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useRouter } from "next/router";
import { IoIosArrowBack, IoIosRepeat } from 'react-icons/io'
import { AuthContext, useAuth } from '../../../src/contexts/auth-context.js'
import { DataContext, useDataContext } from '../../../src/contexts/data-context.js'
import Calendar from '../../../src/components/Calendar.jsx'
import Graph from '../../../src/components/Graph.jsx'

const index = () => {
    const router = useRouter();
    const habitID = router.query.id;
    const { isUserAuthenticated, isLoading, user } = useAuth();
    const { ctxHabits, ctxEntries, userDataLoading, userData, getHabit, getEntriesForHabit, deleteHabit } = useDataContext();

    const [showMore, setShowMore] = useState(false);
    const [habit, setHabit] = useState(null);
    const [entries, setEntries] = useState(null)
    const [timeframe, setTimeframe] = useState(1)
    const [targetDays, setTargetDays] = useState([])

    // Here, we need to get habit with the given ID, from the context
    useEffect(() => {
        // Use async fetches from our context
        const getData = async() => {
            const habitRes = await getHabit({ id: habitID, user });
            const entriesRes = await getEntriesForHabit({ id: habitID, user });
            // Populate state
            setHabit(habitRes.data[0]);
            setTargetDays(habitRes.data[0].schedule.split(','));
            setEntries(entriesRes.data)
        }
        // Wait for user data & habitID before making request
        if(user && habitID){
            getData();
        }
    }, [user, habitID]) // Runs whenever user changes or habitID changes

    const goBack = () => {
        router.push('/stats')
    }

    const updateHabit = () => {
        // setShowNewHabitForm(true);
    }

    const TimeframePicker = ({ timeframe }) => {

        return (
            <div className={styles["tab-container"]}>
                <div className={styles["tabs"]}>
                    <input className={styles["radio"]} type="radio" id="radio-1" name="tabs" checked={timeframe === 1} onClick={() => setTimeframe(1)}/>
                    <label className={styles["tab"]} htmlFor="radio-1">
                        Past 7 Days
                    </label>
                    
                    <input className={styles["radio"]} type="radio" id="radio-2" name="tabs" checked={timeframe === 2}  onClick={() => setTimeframe(2)}/>
                    <label className={styles["tab"]} htmlFor="radio-2">This Month</label>
                    
                    <input className={styles["radio"]} type="radio" id="radio-3" name="tabs" checked={timeframe === 3}  onClick={() => setTimeframe(3)}/>
                    <label className={styles["tab"]} htmlFor="radio-3">All Time</label>

                    <span className={styles["glider"]}></span>
                </div>
            </div>
        )
    }

    return (
        <main className={styles.container}>
            
            <div className={styles.top}>
                <span className={styles.backBtnContainer}>
                <p className={styles["backBtn"]} onClick={goBack}>&larr;</p>
                </span>
                <div className={styles["menu-nav"]}>
                    {habit?.title}
                </div>
            </div>

            <TimeframePicker timeframe={timeframe}/>

            <Graph entries={entries} habit={habit} timeframe={timeframe}/>

        </main>
    )
}

export default index