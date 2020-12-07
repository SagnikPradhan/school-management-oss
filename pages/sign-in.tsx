import { useOAuth } from "lib/auth/sign-in-hook";
import { State } from "lib/store";
import { useSelector } from "react-redux";

export default function SignInPage() {
  const { signIn, providers, signOut, error } = useOAuth();
  const user = useSelector<State, State["user"]>((state) => state.user);

  return (
    <div>
      <div>User - {JSON.stringify(user)}</div>

      <div>{error}</div>

      {!user ? (
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
