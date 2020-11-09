import { signIn, signOut, useSession } from "next-auth/client";
import { Container } from "../components/container";

export default function Home() {
  const [session] = useSession();

  return (
    <Container>
      {!session && (
        <>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
      {session && (
        <>
          Signed in as {session.user.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
    </Container>
  );
}
