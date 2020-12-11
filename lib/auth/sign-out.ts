import firebase from "lib/utility/firebase";

export const signOut = () => firebase.auth().signOut();
