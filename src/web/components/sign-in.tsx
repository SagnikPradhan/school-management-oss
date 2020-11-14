import * as z from "zod"
import React from "react"
import Image from "next/image"
import { signIn } from "next-auth/client"

import { Form,  SubmitFn } from "./form"

export const SignIn: React.FC = () => {
  const form = {
    email: {
      schema: z.string().email( "Email is invalid" ),
      type: "email"
    },

    password: {
      schema: z.string().nonempty( "Password is empty" ),
      type: "password"
    }
  }

  const onSubmit: SubmitFn<typeof form> = ({ email, password }) => {
    signIn( "credentials", { email, password })
      .catch(
        ( error ) => {
          console.error( error )
          alert( "Sorry, there was an internal error." )
        }
      )
  }

  return (
    <div className="sign-in-card">
      <div className="picture">
        <Image width="500" height="388" src="/professor.svg" priority />
      </div>

      <Form form={ form } submitText="Sign in" onSubmit={ onSubmit } />

      <style jsx>{`
        .sign-in-card {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 2em;
        }

        @media only screen and (max-width: 768px) {
          .sign-in-card {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  )
}

export default SignIn
