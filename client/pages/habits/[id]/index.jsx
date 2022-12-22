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
import UpdateHabit from '../../updateHabit.jsx'

const index = () => {
  const router = useRouter();
  const habitID = router.query.id;
  const { isUserAuthenticated, isLoading, user } = useAuth();
  const { userDataLoading, userData, setUserData, setUserDataLoading } = useDataContext();
  const [habit, setHabit] = useState(null);
  const [targetDays, setTargetDays] = useState([])
  const [showNewHabitForm, setShowNewHabitForm] = useState(false)

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

  const showMore = () => {
    return;
  }

  const updateHabit = () => {
    setShowNewHabitForm(true);
  }

  const deleteHabit = () => {
    // are you sure ?
    return (
      <div>
        R U SURE
      </div>
    )
  }


  if(isLoading || userDataLoading )
    return <LoadingScreen/>

  return (
    <main className={styles.container}>
      { showNewHabitForm ? <UpdateHabit habit={habit} setShowNewHabitForm={setShowNewHabitForm}/> : null} 

      <div className={styles.top}>
        <IoIosArrowBack className={styles.backBtn} onClick={goBack}/>

        <span className={styles.titleContainer}>
          <Icon index={habit?.icon.toString()} iconColor={habit?.color}/>
          <h1 className={styles.title}>{habit?.title}</h1>
        </span>
        
        <div className={styles["menu-nav"]}>
          <div className={styles["dropdown-container"]} tabIndex="-1">
          <BsThreeDotsVertical className={styles.moreBtn} onClick={showMore}/>
            <div className={styles.dropdown}>
              <a className={styles.dropdownItem} onClick={updateHabit}><div>Edit Habit</div></a>
              <a className={styles.dropdownItem} onClick={deleteHabit}>
                <div>Delete Habit</div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <span className={styles.hrLine}></span>

      <div className={styles.body}>
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