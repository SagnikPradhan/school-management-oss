import React from "react"

import Head from "next/head"
import { AppProps } from "next/app"

import { Provider as AuthProvider } from 'next-auth/client'

// https://coolors.co/ede6e3-623cea-de3c4b-000000-226f54-e8871e

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <AuthProvider session={ pageProps.session }>
        <Component { ...pageProps } />

        <style global jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');

        html, body {
          margin: 0px;
          min-height: 100vh;

          font-size: 18px;
          font-family: 'Open Sans', sans-serif;
        }
      `}</style>
      </AuthProvider>
    </>
  )
}

export default App
