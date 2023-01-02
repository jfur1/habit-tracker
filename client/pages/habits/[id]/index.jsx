import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { useRouter } from "next/router";
import { AuthContext, useAuth } from '../../../src/contexts/auth-context.js'
import { DataContext, useDataContext } from '../../../src/contexts/data-context.js'
import LoadingScreen from '../../loading.jsx'
import styles from '../../../styles/HabitOverview.module.scss'
import { IoIosArrowBack } from 'react-icons/io'
import { BsThreeDotsVertical } from 'react-icons/bs'
import Icon from '../../../src/components/Icon.jsx'
import Calendar from '../../../src/components/Calendar.jsx'
import UpdateHabit from '../../updateHabit.jsx'


const index = () => {
  const router = useRouter();
  const habitID = router.query.id;
  const { isUserAuthenticated, isLoading, user } = useAuth();
  const { userDataLoading, userData, setUserData, setUserDataLoading } = useDataContext();
  const [habit, setHabit] = useState(null);
  const [targetDays, setTargetDays] = useState([])
  const [showNewHabitForm, setShowNewHabitForm] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showMore, setShowMore] = useState(false)

  // Here, we need to get habit with the given ID, from the context
  useEffect(() => {
    const getData = async() => {     // Fetch data from external API
      const headers = {
        "Authorization": "Bearer " + user.token,
        "Content-Type": 'application/json',
        "id": user.user_id
      };
      const res = await Axios.get(process.env.API_URL + 'habits/' + habitID, {
        headers: headers
      })
      setUserDataLoading(false)
      return res;
    }

    if(user){
      console.log("Received user from context: ", user)
      getData().then((response) => {
        if(response.status === 200){
          console.log('Returned the following habits:', response.data[0])
              setHabit(response.data[0]);
              setTargetDays(response.data[0].schedule.split(','));
        }
      })
    }

  }, [habitID])

  const goBack = () => {
    router.push('/habits')
  }

  const updateHabit = () => {
    setShowNewHabitForm(true);
  }
  const deleteHabit = async() => {
      const headers = {
        "Authorization": "Bearer " + user.token,
        "Content-Type": 'application/json',
        "id": user.user_id
      };
      const res = await Axios.delete(process.env.API_URL + 'habits/' + habitID, {
        headers: headers
      })
      
      if(res.status === 204){
        // Navigate to habits page upon successful delete
        router.push('/habits');
      }
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


  if(isLoading || userDataLoading )
    return <LoadingScreen/>

  return (
    <main className={styles.container}>
      { showNewHabitForm 
        ? <UpdateHabit habit={habit} setShowNewHabitForm={setShowNewHabitForm}/> 
        : null} 

      { showConfirmModal 
        ? <ConfirmDeleteModal habitID={habitID} setShowConfirmModal={setShowConfirmModal}/> 
        : null} 

      <div className={styles.top}>
        <span className={styles.backBtnContainer}>
         <IoIosArrowBack className={styles.backBtn} onClick={goBack}/> 
        </span>


        <span className={styles.titleContainer}>
          <Icon index={habit?.icon.toString()} iconColor={habit?.color}/>
          <h1 className={styles.title}>{habit?.title}</h1>
        </span>
        
        <div className={styles["menu-nav"]}>
          <div className={styles["dropdown-container"]}>
          <BsThreeDotsVertical className={styles.moreBtn} onClick={() => setShowMore(!showMore)}/>
            <div className={styles.dropdown + ' ' + (showMore ? styles.show : '')}>
              <a className={styles.dropdownItem} onClick={updateHabit}><div>Edit Habit</div></a>
              <a className={styles.dropdownItem } onClick={() => setShowConfirmModal(true)}>
                <div>Delete Habit</div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <span className={styles.hrLine}/>

      <div className={styles.body}>
        <Calendar/>
        <div className={styles.target}>
          {/* <p>{habit?.frequency} {habit?.units}</p> */}
          <p>Habit ID: {habit?.habit_id}</p>
          <p>user_id: {habit?.user_id}</p>
          <p>Frequency: {habit?.frequency}</p>
          <p>Units: {habit?.units}</p>
          <div className={styles.targetDays}>
            Schedule:  {targetDays?.map((day, idx) => 
            <p className={styles.day} key={idx}>{day.substring(0,2)}</p>
          )}
          </div>
        </div>
        <div className={styles.description}>
          Description: {habit?.description}
        </div>
        <div className={styles.type}>
          Type: {habit?.type === false ? 'To Avoid' : "To Do"}
        </div>
        <div className={styles.icon}>
          Icon #: {habit?.icon}
        </div>
        <div className={styles.startDate}>
          Started On: {habit?.created}
        </div>
      </div>
    </main>
  )
}

export default index