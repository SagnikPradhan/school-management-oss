import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { State } from "lib/store";
import { useAsync } from "lib/utility/async.hook";
import { signOut } from "lib/auth/sign-out";
import AdminDashoard from "./_admin-dashboard";
import SchoolAdminDashboard from "./_school-admin-dashboard";

export default function Dashboard() {
  const user = useSelector<State, State["user"]>((s) => s.user);
  const router = useRouter();
  const { execute: signOutWrapper } = useAsync(signOut);

  useEffect(() => {
    if (!user) setTimeout(() => !user && router.push("/sign-in"), 1000);
  }, [user]);

  if (!user)
    return (
      <div>
        <h1>Redirecting you to sign in page</h1>
      </div>
    );
  else if (user.role === "admin")
    return (
      <div>
        <AdminDashoard />
        <button onClick={signOutWrapper}>Sign Out</button>
      </div>
    );
  else if (user.role === "school-admin")
    return (
      <div>
        <SchoolAdminDashboard admin={user} />
        <button onClick={signOutWrapper}>Sign Out</button>
      </div>
    );
  else return <p>Get the fuck out of here</p>;
}
