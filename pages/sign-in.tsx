import { useOAuth } from "lib/firebase/web/oauth.hook";
import { State } from "lib/store";
import { useSelector } from "react-redux";

export default function SignInPage() {
  const { signIn, providers, signedIn, signOut, error } = useOAuth();
  const user = useSelector<State, State["user"]>((state) => state.user);

  return (
    <div>
      <div>Signed In - {JSON.stringify({ user, signedIn })}</div>

      <div>{error}</div>

      {!signedIn ? (
        providers.map((provider, key) => (
          <button key={key} onClick={() => signIn(provider)}>
            Sign in with {provider}
          </button>
        ))
      ) : (
        <button onClick={() => signOut()}>Sign out</button>
      )}
    </div>
  );
}

export const getServerSideProps = () => {
  return { props: {} };
};
