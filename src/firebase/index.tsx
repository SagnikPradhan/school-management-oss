import firebase from "firebase/app"

import "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyB85XaQDooD0y5Jw5rgB7_omLn1V6MmYXA",
  authDomain: "schoolmanagementoss.firebaseapp.com",
  databaseURL: "https://schoolmanagementoss.firebaseio.com",
  projectId: "schoolmanagementoss",
  storageBucket: "schoolmanagementoss.appspot.com",
  messagingSenderId: "307928221444",
  appId: "1:307928221444:web:ce1a608c4d76c4911cf251",
  measurementId: "G-B2BJWZSYN2",
}

if (typeof window !== "undefined" && firebase.apps.length === 0)
  firebase.initializeApp(firebaseConfig)

export default firebase
