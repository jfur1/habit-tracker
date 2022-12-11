import '../styles/globals.css'
import React, { useEffect, useContext } from 'react'
import Layout from '../src/layouts/Layout.js'

function MyApp({ Component, pageProps }) {
  return (
      <Component {...pageProps} />
  )
}

export default MyApp
