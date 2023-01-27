import '../styles/globals.scss'
import Head from 'next/head'
import React, { useState, useEffect, useContext } from 'react'
import { AuthProvider } from '../src/contexts/auth-context.js'
import { DataProvider } from '../src/contexts/data-context.js'
import { DarkModeProvider } from '../src/contexts/theme-context.js'
import LoadingScreen from '../pages/loading.jsx'

function MyApp({ Component, pageProps }) {
  return (
    <DarkModeProvider>
      <AuthProvider>
          <DataProvider>
            <Head>
              <title>Habit Tracker</title>
              <meta name="description" content="Habit Tracker App" />
              <link rel="icon" href="bar_chart.png"/>
            </Head>
            <Component {...pageProps} />
          </DataProvider>
      </AuthProvider>
    </DarkModeProvider>
  )
}

export default MyApp
