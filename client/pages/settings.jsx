import React, { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'

const settings = () => {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem('user');
    router.push('/');
  }

  return (
    <div>settings

      <button onClick={logout}>Sign Out</button>
    </div>
    
  )
}

export default settings