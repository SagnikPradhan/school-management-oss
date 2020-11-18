import React from "react"
import { AppProps } from "next/app"
import { Provider as AuthProvider } from 'next-auth/client'
import { createGlobalStyle, DefaultTheme, ThemeProvider } from "styled-components"

const GlobalStyles = createGlobalStyle`
  html, body {
    margin: 0px;
    background: black;
    color: white;
    font-size: 18px;
  }
`

// Palette https://coolors.co/392da6-a59ffc-b6b1f0-bcbad1-070521-01000a
const theme: DefaultTheme = {
  palette: [
    "#392da6",
    "#a59ffc",
    "#b6b1f0",
    "#bcbad1",
    "#070521",
    "#01000a",
  ],

  fonts: [
    "'Montserrat', sans-serif",
    "'Open Sans', sans-serif"
  ]
}


const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <AuthProvider session={ pageProps.session }>
        <GlobalStyles />
        <ThemeProvider theme={ theme }>
          <Component { ...pageProps } />
        </ThemeProvider>
      </AuthProvider>
    </>
  )
}

export default App
