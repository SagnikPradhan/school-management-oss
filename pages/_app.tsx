import { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />

      <style global jsx>{`
        html,
        body {
          margin: 0px;
          min-height: 100vh;
        }
      `}</style>
    </>
  );
}

export default App;
