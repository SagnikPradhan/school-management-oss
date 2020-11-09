import Link from "next/link";
import { Grid, Card, Text, Image, Button } from "@geist-ui/react";

export default function ({ loading }: { loading: boolean }) {
  return (
    <Grid>
      <Card hoverable type="lite" style={{ padding: "1em" }}>
        <Image src="/undraw_with_love_ajy1.svg" width={400}></Image>
        <Text h4>Sign In to continue</Text>

        <Link href="/api/auth/signin">
          <Button loading={loading} type="success">
            Sign In
          </Button>
        </Link>
      </Card>
    </Grid>
  );
}
