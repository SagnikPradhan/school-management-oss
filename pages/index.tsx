import { Page, Grid, Text } from "@geist-ui/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/client";
import UserCard from "web/components/user-account-card";
import { UserModel, PublicUser } from "server/database/models/user";
import initDatabase from "server/database/init";

const HomePage = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Page>
      <Page.Header>
        <Grid.Container style={{ padding: "1em 0" }} justify="center">
          <Text h3>School Management OSS</Text>
        </Grid.Container>
      </Page.Header>

      <Page.Content>
        <Grid.Container justify="center" direction="column">
          <UserCard user={user}></UserCard>
        </Grid.Container>
      </Page.Content>
    </Page>
  );
};

export const getServerSideProps: GetServerSideProps<{
  user?: PublicUser;
}> = async (context) => {
  await initDatabase();
  const session = await getSession(context);

  if (session) {
    const databaseUser = await UserModel.findOne({ email: session.user.email });

    if (databaseUser) {
      const { email, name, school, type } = databaseUser;
      return {
        props: { user: { email, name, school: school || "No School", type } },
      };
    }
  }

  return { props: {} };
};

export default HomePage;
