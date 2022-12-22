import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { useRouter } from "next/router";
import { AuthContext, useAuth } from '../../../src/contexts/auth-context.js'
import { DataContext, useDataContext } from '../../../src/contexts/data-context.js'
import LoadingScreen from '../../loading.jsx'

const index = () => {
  const router = useRouter();
  const habitID = router.query.id;
  const { isUserAuthenticated, isLoading, user } = useAuth();
  const { userDataLoading, userData, setUserData, setUserDataLoading } = useDataContext();
  const [habit, setHabit] = useState(null)

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
        }
      })
    }

  }, [habitID])


  if(isLoading || userDataLoading )
    return <LoadingScreen/>

  return (
    <>
      <div>Post ID: {habitID}</div>
      <div>user: {user.email}</div>
      <div>User ID: {user.user_id}</div>
      <div>{habit?.title}</div>
      <div>{habit?.description}</div>
    </>
  )
}

export default index