import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { useRouter } from "next/router";
import { AuthContext, useAuth } from '../../../src/contexts/auth-context.js'
import { DataContext, useDataContext } from '../../../src/contexts/data-context.js'
import LoadingScreen from '../../loading.jsx'
import styles from '../../../styles/HabitOverview.module.scss'
import { IoIosArrowBack, IoIosRepeat } from 'react-icons/io'
import Icon from '../../../src/components/Icon.jsx'
import Calendar from '../../../src/components/Calendar.jsx'
import UpdateHabit from '../../updateHabit.jsx'
import Dropdown from '../../../src/components/Dropdown.jsx';

const index = () => {
  const router = useRouter();
  const habitID = router.query.id;
  const { isUserAuthenticated, isLoading, user } = useAuth();
  const { ctxHabits, ctxEntries, userDataLoading, userData, getHabit, getEntriesForHabit, deleteHabit } = useDataContext();

  const [loading, setLoading] = useState(false);
  const [habit, setHabit] = useState(null);
  const [entries, setEntries] = useState(null)
  const [targetDays, setTargetDays] = useState([])
  const [showNewHabitForm, setShowNewHabitForm] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showMore, setShowMore] = useState(false)

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

  if(isLoading || userDataLoading)
    return <LoadingScreen/>

  const goBack = () => {
    setLoading(true)
    router.push('/habits')
  }

  const updateHabit = () => {
    setShowNewHabitForm(true);
  }

  const ConfirmDeleteModal = () => {
    // are you sure ?
    return (
      <div className={styles.modalContainer}>
        <div className={styles.modal}>
          <h1>Are you sure?</h1>
          <p>Are you sure that you want to delete this goal? This is a permanent action.</p>
          <span className={styles.btnRow}>
            <button className={styles.closeModal} onClick={() => setShowConfirmModal(false)}>Cancel</button>
            <button className={styles.confirmModal} onClick={deleteHabit}>Delete</button>
          </span>
        </div>
      </div>
    )
  }

  if(isLoading || userDataLoading || loading)
    return <LoadingScreen/>

  return (
      <main className={styles.container}>
      { showNewHabitForm 
        ? <UpdateHabit habit={habit} setShowNewHabitForm={setShowNewHabitForm}/> 
        : 
        <>
        {showConfirmModal 
          ? <ConfirmDeleteModal habitID={habitID} setShowConfirmModal={setShowConfirmModal}/> 
          :  
          <div className={styles.top}>
            <span className={styles.backBtnContainer}>
              <p className={styles["backBtn"]} onClick={goBack}>&larr;</p>
            </span>
            <Dropdown updateHabit={updateHabit} setShowConfirmModal={setShowConfirmModal}/>
          </div>}

          <div className={styles["titleInfo"]}>
              <div className={styles.infoCol}>
                <h1 className={styles.title}>{habit?.title}</h1>
                <p className={styles.description}>{habit?.description}</p>
                {/* <p className={styles.description}>{habit?.frequency} {habit?.units}</p> */}
                <span className={styles.schedule}>
                  <IoIosRepeat className={styles.repeatIcon} style={{ transform: 'scale(1.25)' }}/> 
                  {targetDays.length} days per week
                </span>
              </div>
              <div className={styles.progressCol}>
                <Icon showRings={true} index={habit?.icon} squareSize={85} strokeWidth={5} iconColor={habit?.color}/>
                <p className={styles["progress"]}>{0}% Complete</p>
              </div>
          </div>
          <div className={styles["calendarContainer"]}>
            <Calendar entries={entries} habit={habit}/>
          </div>
        </>
          }
      </main>
  )
}

export default index