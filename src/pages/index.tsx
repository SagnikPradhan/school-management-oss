import React from "react"

import Head from "next/head"
import dynamic from "next/dynamic"
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next"

import { getSession } from "next-auth/client"

import { Page } from "workspace/web/components/page"
import { ParsedUserDocument, parseUserDocument } from "workspace/web/helpers/parseUserDocument"

import { makeSureServerIsFine } from "workspace/server/helpers/make-sure-server-is-fine"
import { User } from "workspace/server/database/models/user"

const SignIn = dynamic( () => import( "workspace/web/components/sign-in" ) )
const Dashboard = dynamic( () => import( "workspace/web/components/dashboard/index.mobile" ) )

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const Home: React.FC<PageProps> = ({ user }) => (
  <>
    <Head>
      <title>School Management | { user ? "Dashboard" : "Sign In"}</title>
    </Head>
  
    <Page
      header={<h3 className="header">School Management OSS</h3>}
    >
      { user ? <Dashboard user={ user } /> : <SignIn /> }
    </Page>
  </>
)

export default Home

export const getServerSideProps = async (
  context: GetServerSidePropsContext 
): Promise<{ props: { user: null | ParsedUserDocument } }> => {
  const session = await getSession( context )

  if ( session !== null ) {
    await makeSureServerIsFine()
    const databaseUser = await User.findOne({ email: session.user.email })

    if ( databaseUser ) {
      return { props: { user: parseUserDocument( databaseUser ) } }
    }
  }

  return { props: { user: null } }
}
