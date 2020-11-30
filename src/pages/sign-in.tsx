import { useRouter } from "next/router"
import { Formik, ErrorMessage, FormikHelpers, Form, Field } from "formik"
import * as z from "zod"

import firebase from "u/firebase"
import useEmailAuth from "u/firebase/auth/useEmailAuth"
import useOAuth from "u/firebase/auth/useOAuth"
import { useUser } from "u/contexts/user"

interface EmailFormFields {
  email: string
  password: string
}

const SignInPage = () => {
  const { push } = useRouter()
  const { user } = useUser()

  if (user) firebase.auth().signOut()

  const emailAuth = useEmailAuth()
  const oAuth = useOAuth()

  // Email sign in validation
  const emailFormValidateFn = ({ email, password }: EmailFormFields) => {
    const emailSchema = z.string().email("Expected a valid email")
    const result = emailSchema.safeParse(email)
    if (result.success) return {}
    else
      return {
        email: result.error.errors[0].message,
        password: password.length === 0 ? "Expected a password" : "",
      }
  }

  // Email sign in handler
  const emailFormSubmitFn = (
    values: EmailFormFields,
    { setSubmitting }: FormikHelpers<EmailFormFields>
  ) => {
    emailAuth
      .signIn(values.email, values.password)
      .then(() => push("/"))
      .finally(() => setSubmitting(false))
  }

  // Oauth sign in wrapper
  function oAuthSignIn(...params: Parameters<typeof oAuth.signIn>) {
    oAuth.signIn(...params).then(() => push("/"))
  }

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-tr from-pink-300 to-purple-300">
      <div className="bg-gradient-to-tr from-indigo-600 to-purple-700 shadow-xl p-9 flex flex-col items-center justify-center rounded-md gap-5">
        <h1 className="text-4xl text-white font-bold">Sign In</h1>

        <Formik
          initialValues={{ email: "", password: "" }}
          validate={emailFormValidateFn}
          onSubmit={emailFormSubmitFn}
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

              <div className="text-purple-100 text-sm flex flex-col items-center">
                <ErrorMessage name="password" component="span" />
                <ErrorMessage name="email" component="span" />
                {emailAuth.error}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-white py-3 px-6 rounded text-gray-900 font-semibold hover:bg-green-500 hover:text-white hover:shadow"
              >
                Sign in with credentials
              </button>
            </Form>
          )}
        </Formik>

        <hr className="w-full m-2 border-purple-400" />

        <button
          onClick={() => oAuthSignIn("google")}
          className="bg-white py-3 px-6 rounded text-gray-900 font-semibold hover:bg-pink-600 hover:text-white hover:shadow"
        >
          Sign in with Google
        </button>

        <button
          onClick={() => oAuthSignIn("facebook")}
          className="bg-white py-3 px-6 rounded text-gray-900 font-semibold hover:bg-blue-800 hover:text-white hover:shadow"
        >
          Sign in with Facebook
        </button>
      </div>
    </div>
  )
}

export default SignInPage
