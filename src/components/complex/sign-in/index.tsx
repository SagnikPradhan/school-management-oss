import React from "react"

import { Card } from "workspace/components/basic/card"
import { Button } from "workspace/components/basic/button"

import { signIn } from "workspace/firebase/auth"

export default function SignIn() {
  return (
    <Card>
      <h1>Sign In</h1>

      <p>Sign into your account</p>

      <span className="spacer"></span>

      <Button onClick={() => signIn("google")}>Sign in with Google</Button>
      <Button variant="secondary" onClick={() => signIn("facebook")}>
        Sign in with Facebook
      </Button>
    </Card>
  )
}
