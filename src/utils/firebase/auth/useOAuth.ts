import { useState } from "react"
import firebase from "../"
import { googleSignInProvider, facebookSignInProvider } from "./providers"

export default function useOAuth() {
  const [error, setError] = useState<string>()

  return {
    error,
    signIn: (provider: "google" | "facebook") => {
      const providerInstance =
        provider === "google" ? googleSignInProvider : facebookSignInProvider

      const auth = firebase.auth()

      return auth.signInWithPopup(providerInstance).catch((error) => {
        console.error(error)
        setError("There was an unknown error")
      })
    },
  }
}
