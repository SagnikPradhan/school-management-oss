import { useState } from "react";
import {
  Grid,
  Card,
  Image,
  Button,
  Spacer,
  Input,
  Text,
} from "@geist-ui/react";
import { Nope } from "nope-validator";
import { ShapeErrors } from "nope-validator/lib/umd/types";
import { signIn } from "next-auth/client";

export const SignInCard = () => {
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [errors, setErrors] = useState<ShapeErrors | undefined>();
  const [loading, setLoading] = useState(false);

  const inputSchema = Nope.object().shape({
    email: Nope.string()
      .email("Please provide a valid email.")
      .required("Email is required."),
    password: Nope.string().required("Password is required."),
  });

  const resetErrors = () => {
    const errors = inputSchema.validate({ email, password }) as
      | ShapeErrors
      | undefined;
    setErrors(errors);
  };

  const submit = () => {
    resetErrors();
    if (typeof errors === "object") return;
    else {
      setLoading(true);
      signIn("credentials", { email, password });
    }
  };

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
                status={errors?.email ? "error" : "success"}
                onChange={({ target }) => setEmail(target.value)}
              >
                Email
              </Input>
            </Grid>

            <Grid>
              <Input.Password
                width="100%"
                status={errors?.password ? "error" : "success"}
                onChange={({ target }) => setPassword(target.value)}
              >
                Password
              </Input.Password>
            </Grid>

            <Grid>
              {errors ? (
                Object.values(errors).map((err) => (
                  <Text type="secondary">{err}</Text>
                ))
              ) : (
                <Spacer x={0.5} />
              )}
            </Grid>

            <Grid>
              <Button ghost type="success" loading={loading} onClick={submit}>
                Sign in
              </Button>
            </Grid>
          </Grid.Container>
        </Card>
      </Grid>
    </Grid.Container>
  );
};
