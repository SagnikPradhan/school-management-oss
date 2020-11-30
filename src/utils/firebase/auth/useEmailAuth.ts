import { useState } from "react"
import firebase from "../"

const ERROR_MAP = {
  "auth/invalid-email": "Please enter an valid email.",
  "auth/user-disabled": "This account has been disabled.",
  "auth/user-not-found": "No user was found associated with this email.",
  "auth/wrong-password": "Please enter the valid password",
} as const

export default function useEmail() {
  const [error, setError] = useState<undefined | string>(undefined)

  return {
    error,
    signIn: (
      email: string,
      password: string
      // prevCredentials?: firebase.auth.AuthCredential
    ) =>
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        // .then(({ user }) => {
        //   if (prevCredentials && user)
        //     return user.linkWithCredential(prevCredentials)
        //   else return null
        // })
        .catch((error) => {
          console.error(error)
          const code = error.code as keyof typeof ERROR_MAP
          setError(ERROR_MAP[code] || "There was an unknown internal error")
        }),
  }
}
