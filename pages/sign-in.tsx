import { useSignIn } from "lib/auth/sign-in-hook";
import { State } from "lib/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function SignInPage() {
  const { signIn, providers, error } = useSignIn();
  const router = useRouter();
  const user = useSelector<State, State["user"]>((state) => state.user);

  useEffect(() => {
    if (user) setTimeout(() => router.push("/dashboard"), 1000);
  }, [user]);

  if (user)
    return (
      <div>
        <h1>Redirecting you to dashboard</h1>
      </div>
    );
  else
    return (
      <div>
        <div>{error}</div>

        {providers.map((provider, key) => (
          <button key={key} onClick={() => signIn(provider)}>
            Sign in with {provider}
          </button>
        ))}
      </div>
    );
}

export const getServerSideProps = () => {
  return { props: {} };
};
