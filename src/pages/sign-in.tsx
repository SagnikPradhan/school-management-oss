import React from "react"
import styled from "styled-components"

import Layout from "workspace/web/components/layout"
import Form from "workspace/web/components/form"
import Field from "workspace/web/components/form/field"
import Button from "workspace/web/components/button"

import { useForm } from "workspace/web/hooks/form"
import * as z from "zod"
import { signIn } from "next-auth/client"

const SignInLayout = styled( Layout )`
  height: 100vh;
  background: ${({ theme: { palette } }) => palette[5]};
`

const Error = styled.span`
  font-family: ${({ theme: { fonts } }) => fonts[2]};
  color: black;
`

export const SignInPage: React.FC = () => {
  const schema = {
    email: z.string().email( "Invalid email" ),
    password: z.string().nonempty( "Empty Password" )
  }

  const { state, register } = useForm( schema )

  const onSubmit = ( event: React.FormEvent<HTMLFormElement> ) => {
    event.preventDefault()
    signIn( "credentials", { email: state.values.email, password: state.values.password })
  }

  return (
    <SignInLayout center className="sign-in">
      <Form className="sign-in" onSubmit={ onSubmit }>
        <Field onChange={ register( "email" ) } name="Your Email" type="email" />
        <Field onChange={ register( "password" ) } name="Your Password" type="password" />

        <Layout as="span" className="error">
          { 
            Object
              .values( state.errors )
              .map( ( err, key ) => <Error key={ key }>{ err }</Error> ) 
          }
        </Layout>

        <Button disabled={ !!state.errors || !state.isDirty } type="submit">Sign in</Button>
      </Form>
    </SignInLayout>
  )
}

export default SignInPage
