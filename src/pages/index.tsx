import React from "react"
import styled from "styled-components"
import dynamic from "next/dynamic"

import { useUser } from "workspace/contexts/user"
import { Button } from "workspace/components/basic/button"
import { signOut } from "workspace/firebase/auth"
import { Text } from "workspace/components/basic/text"

const Layout = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: sans-serif;
`

const Heading = styled.h1`
  font-size: 4rem;
  text-align: center;
`

const SignIn = dynamic(() => import("workspace/components/complex/sign-in"))

export default function Home() {
  const { user } = useUser()

  return (
    <Layout>
      <Heading>Hey there!</Heading>

      {user ? (
        <>
          <code>
            <pre>{JSON.stringify(user, null, 4)}</pre>
          </code>

          <Button onClick={signOut}>
            <Text>Sign Out</Text>
          </Button>
        </>
      ) : (
        <SignIn></SignIn>
      )}
    </Layout>
  )
}
