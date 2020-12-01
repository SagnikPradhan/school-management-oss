import { AppError } from "u/error"
import firebase from ".."

const ERROR_MAP = {
  "auth/invalid-email": "Please enter an valid email.",
  "auth/user-disabled": "This account has been disabled.",
  "auth/user-not-found": "No user was found associated with this email.",
  "auth/wrong-password":
    "Please enter the valid password. " +
    "If you signed in using one of the providers, " +
    "please use it from now on. Your password was removed.",
} as const

export interface EmailError {
  message: string
}

const signIn = (email: string, password: string) =>
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch((error) => {
      const code = error.code as keyof typeof ERROR_MAP
      throw new AppError("EMAIL_ERROR", {
        message: ERROR_MAP[code] || "There was an unknown internal error",
      })
    })

export default signIn
