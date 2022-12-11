import '../styles/globals.css'
import React, { useEffect, useContext } from 'react'
import NavBar from '../src/components/NavBar.jsx'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <NavBar/>
    </>
  )
}

export default MyApp
