import Link from "next/link";
import {
  Grid,
  Card,
  Text,
  Image,
  Button,
  Avatar,
  Description,
  Spacer,
} from "@geist-ui/react";
import { PublicUser, UserType } from "server/database/models/user";

export default function UserAccount({ user }: { user?: PublicUser }) {
  return <Grid>{user ? <UserAccountCard user={user} /> : <SignInCard />}</Grid>;
}

const SignInCard = () => (
  <Card hoverable type="lite" style={{ padding: "1em" }}>
    <Image src="/undraw_with_love_ajy1.svg" width={400}></Image>
    <Text h4>Sign In to continue</Text>

    {/* FIX HERE: Use manual sigin method */}
    <Link href="/api/auth/signin">
      <Button type="success">Sign In</Button>
    </Link>
  </Card>
);

const UserAccountCard = ({
  user: { email, name, school, type },
}: {
  user: PublicUser;
}) => {
  const accountTypeString =
    type === UserType.ADMIN
      ? "Admin"
      : type === UserType.ROOT
      ? "Root Admin"
      : type === UserType.TEACHER
      ? "Teacher"
      : "Student";

  return (
    <Card hoverable type="lite" style={{ padding: "1em" }} width="max-content">
      <Card.Content>
        <Grid.Container
          direction="row"
          alignItems="flex-start"
          justify="space-between"
          gap={2}
        >
          <Grid>
            <Avatar src={""} size="large"></Avatar>
          </Grid>

          <Grid>
            <Description title="Name" content={<Text h3>{name}</Text>} />
          </Grid>

          <Grid>
            <Description title="Email" content={email} />
            <Spacer y={1}></Spacer>
            <Description title="Account Type" content={accountTypeString} />
            <Spacer y={1}></Spacer>
            <Description title="School" content={school} />
          </Grid>
        </Grid.Container>
      </Card.Content>

      <Card.Footer>
        <Grid.Container justify="flex-end" alignItems="flex-end">
          <Link href="/api/auth/signout">
            <Button type="error">Sign Out</Button>
          </Link>
        </Grid.Container>
      </Card.Footer>
    </Card>
  );
};
