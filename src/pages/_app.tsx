import React from "react"
import { AppProps } from "next/app"
import { Provider as AuthProvider } from 'next-auth/client'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <AuthProvider session={ pageProps.session }>
        <Component { ...pageProps } />

        <style global jsx>{`
          html, body {
            margin: 0;
          }  
        `}</style>
      </AuthProvider>
    </>
  )
}

export default App
