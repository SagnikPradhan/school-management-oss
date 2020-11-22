import React from "react"
import styled from "styled-components"
import { initFirebase } from "../workers/firebase.worker"

const Layout = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Heading = styled.h1`
  font-size: 4rem;
  font-family: sans-serif;
  text-align: center;
`

export default function Home() {
  initFirebase().catch(console.error)

  return (
    <Layout>
      <Heading>Hey there!</Heading>
    </Layout>
  )
}
