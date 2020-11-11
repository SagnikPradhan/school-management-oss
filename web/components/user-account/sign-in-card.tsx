import { Grid, Card, Image, Button, Input } from "@geist-ui/react";
import { signIn } from "next-auth/client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const SignInCard = () => {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().nonempty(),
  });

  const { register, handleSubmit, errors } = useForm<{
    email: string;
    password: string;
  }>({
    resolver: zodResolver(schema),
  });

  return (
    <Grid.Container direction="row" alignItems="center" justify="space-around">
      <Grid>
        <Image src="/undraw_with_love_ajy1.svg" width={300}></Image>
      </Grid>

      <Grid>
        <Card hoverable style={{ padding: "1em" }}>
          <Grid.Container direction="column" justify="center" gap={1}>
            <Grid>
              <Input
                width="100%"
                type="email"
                name="email"
                ref={register}
                status={errors.email ? "error" : "default"}
              >
                Email
              </Input>
            </Grid>

            <Grid>
              <Input.Password
                width="100%"
                name="password"
                ref={register}
                status={errors.password ? "error" : "default"}
              >
                Password
              </Input.Password>
            </Grid>

            <Grid>
              <Button
                ghost
                type="success"
                onClick={handleSubmit((data) => signIn("credentials", data))}
              >
                Sign in
              </Button>
            </Grid>
          </Grid.Container>
        </Card>
      </Grid>
    </Grid.Container>
  );
};
