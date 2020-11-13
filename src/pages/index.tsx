import React from "react"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { getSession } from "next-auth/client"
import { User, UserProps } from "workspace/server/database/models/user"
import { SignIn } from "workspace/web/components/sign-in"
import { Page } from "workspace/web/components/page"
import Head from "next/head"

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const Home: React.FC<PageProps> = ({ user }) => (
  <>
    <Head>
      <title>School Management | { user ? "Dashboard" : "Sign In"}</title>
    </Head>
  
    <Page>
      { user ? <code>{ JSON.stringify( user, null, 2 ) }</code> : <SignIn /> }
    </Page>
  </>
)

export default Home

export const getServerSideProps: GetServerSideProps<{
  user: null | Omit<UserProps, "_id" | "password" | "__v">
}> = async ( context ) => {
  const session = await getSession( context )

  if ( session !== null ) {
    const databaseUser = await User.findOne({ email: session.user.email })
    if ( databaseUser ) {
      const { name, email, school, type, image } = databaseUser
      return { props: { user: { name, email, school, type, image } } }
    }
  }

  return { props: { user: null } }
}
