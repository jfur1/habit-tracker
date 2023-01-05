import '../styles/globals.scss'
import React, { useEffect, useContext } from 'react'
import { AuthProvider } from '../src/contexts/auth-context.js'
import { DataProvider } from '../src/contexts/data-context.js'
import { DarkModeProvider } from '../src/contexts/theme-context.js'

function MyApp({ Component, pageProps }) {
  return (
    <DarkModeProvider>
      <AuthProvider>
        <DataProvider>
          <Component {...pageProps} />
        </DataProvider>
      </AuthProvider>
    </DarkModeProvider>
  )
}

export default MyApp
