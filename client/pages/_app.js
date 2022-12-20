import '../styles/globals.scss'
import React, { useEffect, useContext } from 'react'
import { AuthProvider } from '../src/contexts/auth-context.js'
import { DataProvider } from '../src/contexts/data-context.js'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <DataProvider>
        <Component {...pageProps} />
      </DataProvider>
    </AuthProvider>
  )
}

export default MyApp
