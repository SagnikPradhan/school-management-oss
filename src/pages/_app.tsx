import React from "react"

import { AppProps } from "next/app"

import { Provider as AuthProvider } from 'next-auth/client'

// https://coolors.co/ede6e3-623cea-de3c4b-000000-226f54-e8871e

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <AuthProvider session={ pageProps.session }>
        <Component { ...pageProps } />

        <style global jsx>{`
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
