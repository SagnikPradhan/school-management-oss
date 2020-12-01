import firebase from ".."
import { googleSignInProvider, facebookSignInProvider } from "./oauth.providers"
import { AppError } from "u/error"

export interface OAuthUnknownError {
  internalError: Error
  message: string
}

export interface OAuthLinkAccountsError {
  creds: firebase.auth.AuthCredential
  message: string
}

const signIn = (
  provider: "google" | "facebook",
  prevCreds?: firebase.auth.AuthCredential
) => {
  const providerInstance =
    provider === "google" ? googleSignInProvider : facebookSignInProvider

  const auth = firebase.auth()

  return auth
    .signInWithPopup(providerInstance)
    .then(({ user }) => {
      if (prevCreds && user) user.linkWithCredential(prevCreds)
    })
    .catch((error) => {
      if (error.code === "auth/account-exists-with-different-credential") {
        throw new AppError("OAUTH_LINK_ACCOUNT", {
          creds: error.credential,
          message:
            "Seems like this provider isn't linked " +
            "to your account, please sign in using the " +
            "other provider",
        })
      } else
        throw new AppError("OAUTH_UNKNOWN", {
          internalError: error,
          message: "There was an unknown error",
        })
    })
}

export default signIn
