import * as firebase from "firebase-admin";

// https://stackoverflow.com/a/41044630/1332513
export const app = firebase.initializeApp({
  credential: firebase.credential.cert({
    projectId: "schoolmanagementoss",
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
  }),

  databaseURL: "https://schoolmanagementoss.firebaseio.com",
});
