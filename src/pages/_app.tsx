import { AppProps } from "next/app"
import { createGlobalStyle } from "styled-components"
import { UserProvider } from "workspace/contexts/user"

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </>
  )
}
