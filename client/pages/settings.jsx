import React, { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import NavBar from '../src/components/NavBar.jsx'

const settings = () => {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem('user');
    router.push('/');
  }

  return (
    <>
    <div>settings
    </div>

    <button onClick={logout}>Sign Out</button>
    <NavBar currentIdx={4}/>
      </>
  )
}

export default settings