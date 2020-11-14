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
        <Image src="/welcome_cats.svg" width="400" height="auto" />
      </div>

      <Form form={ form } submitText="Sign in" onSubmit={ onSubmit } />

      <style jsx>{`
        .sign-in-card {
          display: flex;
          flex-direction: row;
          align-items: center;
        }

        @media only screen and (max-width: 768px) {
          .sign-in-card {
            flex-direction: column;
          }
        }

        .sign-in-form {
          display: flex;
          flex-direction: column;
          justify-content: center;;
          gap: 1em;

          font-size: 0.85rem;

          padding: 1.5rem;
          box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </div>
  )
}

export default SignIn
