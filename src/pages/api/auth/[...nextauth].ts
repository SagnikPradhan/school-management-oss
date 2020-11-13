import NextAuth, { InitOptions } from "next-auth"
import Providers from "next-auth/providers"

import { wrapHandler } from "workspace/server"
import { User } from "workspace/server/database/models/user"

const options: InitOptions = {
  providers: [
    Providers.Credentials(
      {
        name: "Credentials",
        
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" }
        },

        authorize: async ({ email, password }) => {
          const user = await User.findOne({ email }, "password" )
          if ( !user ) return null

          if ( User.verifyUser( password, user ) )
            return { email, name: user.name }
          else return null
        }
      }
    )
  ],

  // @ts-expect-error Types seems to be messed up here
  jwt: { signingKey: process.env.JWT_SECRET }
}

const handler = wrapHandler( ( req, res ) => NextAuth( req, res, options ) )
export default handler
