import { useSession } from "next-auth/client";

// Components
import Link from "next/link";
import { Page, Button, Grid, Text, Card } from "@geist-ui/react";

import SignIn from "../components/sign-in";

const HomePage = () => {
  const [session, loading] = useSession();

  return (
    <Page>
      <Page.Header>
        <Grid.Container
          style={{ padding: "1em 0" }}
          justify={session ? "space-between" : "center"}
        >
          <Text h3>School Management OSS</Text>

          {session && (
            <Link href="/api/auth/signout">
              <Button loading={loading} type="error">
                Sign Out
              </Button>
            </Link>
          )}
        </Grid.Container>
      </Page.Header>

      <Page.Content>
        <Grid.Container alignItems="center" justify="center" direction="column">
          {session ? <Card></Card> : <SignIn loading={loading}></SignIn>}
        </Grid.Container>
      </Page.Content>
    </Page>
  );
};

export default HomePage;
