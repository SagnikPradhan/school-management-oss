import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { useStore } from "../lib/store/hook";

export default function App({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
