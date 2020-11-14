import React from "react"

import Head from "next/head"
import dynamic from "next/dynamic"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"

import { getSession } from "next-auth/client"

import { Page } from "workspace/web/components/page"
import { makeSureServerIsFine } from "workspace/server/helpers"
import { User, UserProps } from "workspace/server/database/models/user"

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const SignIn = dynamic( () => import( "workspace/web/components/sign-in" ) )

const Home: React.FC<PageProps> = ({ user }) => (
  <>
    <Head>
      <title>School Management | { user ? "Dashboard" : "Sign In"}</title>
    </Head>
  
    <Page
      header={<h3 className="header">School Management OSS</h3>}
    >
      { !user && <SignIn /> }
    </Page>
  </>
)

export default Home

export const getServerSideProps: GetServerSideProps<{
  user: null | Omit<UserProps, "_id" | "password" | "__v">
}> = async ( context ) => {
  const session = await getSession( context )
  console.log({ session })

  if ( session !== null ) {
    await makeSureServerIsFine()
    const databaseUser = await User.findOne({ email: session.user.email })

    if ( databaseUser ) {
      const { name, email, school, type, image } = databaseUser
      return { props: { user: { name, email, school, type, image } } }
    }
  }

  return { props: { user: null } }
}
