import '../styles/globals.scss'
import React, { useEffect, useContext } from 'react'
import { AuthProvider } from '../src/contexts/auth-context.js'
import { DataProvider } from '../src/contexts/data-context.js'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
        <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
