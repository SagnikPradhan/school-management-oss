import { AppProps } from "next/app";
import { Provider as NextAuthProvider } from "next-auth/client";
import { GeistProvider, CssBaseline } from "@geist-ui/react";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <NextAuthProvider session={pageProps.session}>
      <GeistProvider>
        <CssBaseline />
        <Component {...pageProps} />
      </GeistProvider>
    </NextAuthProvider>
  );
};

export default App;

/**
 * Notes
 *
 * 1. Error - Infinite loading with cannot find module `aws-sdk`
 *    Happened cause I was importing an enum inside a component
 */
