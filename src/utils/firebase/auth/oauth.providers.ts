import firebase from "../index"

export const googleSignInProvider = new firebase.auth.GoogleAuthProvider()
googleSignInProvider.addScope("profile")
googleSignInProvider.addScope("email")

export const facebookSignInProvider = new firebase.auth.FacebookAuthProvider()
facebookSignInProvider.addScope("email")
