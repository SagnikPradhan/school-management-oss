import React from "react"

import { Card } from "workspace/components/basic/card"
import { Button } from "workspace/components/basic/button"
import { Text } from "workspace/components/basic/text"

import { signIn } from "workspace/firebase/auth"

export default function SignIn() {
  return (
    <Card>
      <Text size={2}>Sign In</Text>

      <Text pad>Sign into your account.</Text>

      <Button variant={0} onClick={() => signIn("google")}>
        <Text>
          Sign in with
          <Text as="b" bold>
            Google
          </Text>
        </Text>
      </Button>

      <Button variant={1} onClick={() => signIn("facebook")}>
        <Text>
          Sign in with
          <Text as="b" bold>
            Facebook
          </Text>
        </Text>
      </Button>
    </Card>
  )
}
