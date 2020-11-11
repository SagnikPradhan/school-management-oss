import {
  Grid,
  Card,
  Text,
  Button,
  Avatar,
  Description,
  Spacer,
} from "@geist-ui/react";
import { useState } from "react";
import { signOut } from "next-auth/client";
import { PublicUser } from "server/database/models/user";

export const UserAccountCard = ({
  user: { email, name, school, type },
}: {
  user: PublicUser;
}) => {
  const [loading, setLoading] = useState(false);

  const startSignOutProcess = () => {
    setLoading(true);
    signOut();
  };

  const accountTypeString =
    type === 1
      ? "Admin"
      : type === 0
      ? "Root Admin"
      : type === 2
      ? "Teacher"
      : "Student";

  return (
    <Card hoverable type="lite" style={{ padding: "1em" }}>
      <Card.Content>
        <Grid.Container
          direction="row"
          alignItems="flex-start"
          justify="space-around"
          gap={2}
        >
          <Grid>
            <Avatar src={"/undraw_female_avatar_w3jk.svg"} size={150}></Avatar>
          </Grid>

          <Grid>
            <Description title="Name" content={<Text h4>{name}</Text>} />
            <Spacer y={1}></Spacer>
            <Description title="Email" content={email} />
          </Grid>

          <Grid>
            <Description title="Account Type" content={accountTypeString} />
            <Spacer y={1}></Spacer>
            <Description title="School" content={school} />
          </Grid>
        </Grid.Container>
      </Card.Content>

      <Card.Footer>
        <Grid.Container justify="flex-end" alignItems="flex-end">
          <Button
            ghost
            type="warning"
            loading={loading}
            onClick={startSignOutProcess}
          >
            Sign Out
          </Button>
        </Grid.Container>
      </Card.Footer>
    </Card>
  );
};
