import React from "react"
import styled from "styled-components"

import firebase from "workspace/firebase"
import { useUser } from "workspace/contexts/user"

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

const GoogleSignInProvider = new firebase.auth.GoogleAuthProvider()
GoogleSignInProvider.addScope("profile")
GoogleSignInProvider.addScope("email")

export default function Home() {
  const { user, isLoading } = useUser()

  return (
    <Layout>
      <Heading>Hey there!</Heading>

      <p>{isLoading ? "loading" : "loaded"}</p>

      <code>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </code>

      {!user ? (
        <button
          onClick={() => firebase.auth().signInWithPopup(GoogleSignInProvider)}
        >
          Sign In
        </button>
      ) : (
        <button onClick={() => firebase.auth().signOut()}>Sign Out</button>
      )}
    </Layout>
  )
}
