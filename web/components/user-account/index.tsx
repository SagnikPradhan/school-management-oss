import { Grid } from "@geist-ui/react";

import type { PublicUser } from "server/database/models/user";

import { SignInCard } from "./sign-in-card";
import { UserAccountCard } from "./user-account-card";

export default function UserAccount({ user }: { user?: PublicUser }) {
  return <Grid>{user ? <UserAccountCard user={user} /> : <SignInCard />}</Grid>;
}
