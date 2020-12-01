import * as z from "zod"
import router from "next/router"
import Head from "next/head"
import type firebase from "firebase"
import { useEffect, useState } from "react"
import { Formik, ErrorMessage, Form, Field } from "formik"

import useAsync from "u/hooks/useAsync"
import emailSignInAsync from "u/firebase/auth/email"
import oAuthSignInAsync from "u/firebase/auth/oauth"
import { useUser } from "u/contexts/user"
import { AppError } from "u/error"

interface EmailFormFields {
  email: string
  password: string
}

const SignInPage = () => {
  const { user } = useUser()

  const { execute: emailSignIn, error: emailSignInError } = useAsync(
    emailSignInAsync
  )
  const { execute: oAuthSignIn, error: oAuthSignInError } = useAsync(
    oAuthSignInAsync
  )

  // To keep track of previous credentials
  const [prevCreds, setPrevCreds] = useState<
    firebase.auth.AuthCredential | undefined
  >(undefined)

  useEffect(() => {
    if (oAuthSignInError?.name === "OAUTH_LINK_ACCOUNT")
      setPrevCreds(
        (oAuthSignInError as AppError<"OAUTH_LINK_ACCOUNT">).props.creds
      )
  }, [oAuthSignInError])

  // Redirect if logged in
  useEffect(() => {
    if (user) router.push("/dashboard")
  }, [user])

  // Email sign in validation
  const emailFormValidateFn = ({ email, password }: EmailFormFields) => {
    const emailSchema = z.string().email("Expected a valid email")
    const result = emailSchema.safeParse(email)
    if (result.success) return {}
    return {
      email: result.error.errors[0].message,
      password: password.trim().length === 0 ? "Expected a password" : "",
    }
  }

  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>

      <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-tr from-pink-300 to-purple-300">
        <div className="bg-gradient-to-tr from-indigo-600 to-purple-700 shadow-xl p-9 flex flex-col items-center justify-center sm:rounded-md gap-5 w-screen sm:w-72">
          <h1 className="text-4xl text-white font-bold">Sign In</h1>

          <Formik
            initialValues={{ email: "", password: "" }}
            validate={emailFormValidateFn}
            onSubmit={({ email, password }) => emailSignIn(email, password)}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col items-center justify-center gap-4">
                <label
                  htmlFor="email"
                  className="flex flex-col gap-1 text-white text-sm w-full"
                >
                  Email
                  <Field
                    type="email"
                    name="email"
                    className="rounded p-2 text-gray-900"
                  />
                </label>

                <label
                  htmlFor="password"
                  className="flex flex-col gap-1 text-white text-sm w-full"
                >
                  Password
                  <Field
                    type="password"
                    name="password"
                    className="rounded p-2 text-gray-900"
                  />
                </label>

                <div className="text-purple-100 text-sm flex flex-col items-center text-center">
                  <ErrorMessage name="password" component="span" />
                  <ErrorMessage name="email" component="span" />
                  {emailSignInError?.props.message}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-white py-3 px-6 rounded text-gray-900 font-semibold hover:bg-green-500 hover:text-white hover:shadow"
                >
                  Sign in with Credentials
                </button>
              </Form>
            )}
          </Formik>

          <hr className="w-full m-2 border-purple-400" />

          <>
            <button
              onClick={() => oAuthSignIn("google", prevCreds)}
              className="bg-white py-3 px-6 rounded text-gray-900 font-semibold hover:bg-pink-600 hover:text-white hover:shadow"
            >
              Sign in with Google
            </button>

            <button
              onClick={() => oAuthSignIn("facebook", prevCreds)}
              className="bg-white py-3 px-6 rounded text-gray-900 font-semibold hover:bg-blue-800 hover:text-white hover:shadow"
            >
              Sign in with Facebook
            </button>

            {oAuthSignInError && (
              <span className="text-purple-100 text-sm flex flex-col items-center text-center">
                {oAuthSignInError.props.message}
              </span>
            )}
          </>
        </div>
      </div>
    </>
  )
}

export default SignInPage
