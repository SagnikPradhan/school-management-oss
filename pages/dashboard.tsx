import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { State } from "lib/store";
import { useAsync } from "lib/utility/async.hook";
import { signOut } from "lib/auth/sign-out";

export default function Dashboard() {
  const user = useSelector<State, State["user"]>((s) => s.user);
  const router = useRouter();
  const { execute: signOutWrapper } = useAsync(signOut);

  useEffect(() => {
    if (!user) setTimeout(() => router.push("/sign-in"), 1000);
  }, [user]);

  if (!user)
    return (
      <div>
        <h1>Redirecting you to sign in page</h1>
      </div>
    );
  else
    return (
      <div>
        <h1>Welcome to the dasboard</h1>
        <button onClick={signOutWrapper}>Sign Out</button>
      </div>
    );
}
