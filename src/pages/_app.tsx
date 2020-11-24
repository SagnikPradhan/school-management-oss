import { AppProps } from "next/app"
import Head from "next/head"
import { createGlobalStyle } from "styled-components"
import { UserProvider } from "workspace/contexts/user"

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 18px;
  }

  h1, h2, h3 {
    font-family: "Montserrat", sans-serif;
    font-weight: 600;
    margin: 1rem 0;
  }

  p {
    margin: 0;
    font-family: "Open Sans", sans-serif;
    font-weight: 400;
  }
`

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600&family=Open+Sans&display=swap"
          rel="stylesheet"
        />
      </Head>

      <GlobalStyle />
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </>
  )
}
