import firebase from "./"

const GoogleSignInProvider = new firebase.auth.GoogleAuthProvider()
GoogleSignInProvider.addScope("profile")
GoogleSignInProvider.addScope("email")

const FacebookSignInProvider = new firebase.auth.FacebookAuthProvider()
FacebookSignInProvider.addScope("email")

export const signIn = (provider: "google" | "facebook") => {
  const auth = firebase.auth()

  const signInProcess =
    provider === "google"
      ? auth.signInWithPopup(GoogleSignInProvider)
      : auth.signInWithPopup(FacebookSignInProvider)

  signInProcess.catch((err) => {
    console.error(err)

    if (err.code === "auth/account-exists-with-different-credential") {
      const usersOtherProvider =
        provider === "google" ? FacebookSignInProvider : GoogleSignInProvider

      auth
        .signInWithPopup(usersOtherProvider)
        .then(({ user }) => user!.linkWithCredential(err.credential))
        .catch((err) => console.error(err))
    }
  })
}

export const signOut = () => {
  firebase
    .auth()
    .signOut()
    .catch((err) => console.error(err))
}
