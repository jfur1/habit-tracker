import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router";
import { AuthContext, useAuth } from '../../../src/contexts/auth-context.js'
import { DataContext, useDataContext } from '../../../src/contexts/data-context.js'
import LoadingScreen from '../../loading.jsx'

const index = () => {
  const router = useRouter();
  const habitID = router.query.id;
  const { isUserAuthenticated, isLoading, user } = useAuth();
  const { userDataLoading, userData, setUserData } = useDataContext();
  const [habit, setHabit] = useState(null)

  // Here, we need to get habit with the given ID, from the context
  useEffect(() => {
    

  }, [])


  if(isLoading || userDataLoading)
    return <LoadingScreen/>

  return (
    <>
      <div>Post ID: {habitID}</div>
      <div>user: {user.email}</div>
      {/* <div>{userData[0]?.title}</div>
      <div>{userData[0]?.description}</div> */}
    </>
  )
}

export default index