import { useEffect, useState } from "react";

import firebase from "lib/utility/firebase";
import { errorReducer } from "./error-reducer";

const providers = {
  googe: new firebase.auth.GoogleAuthProvider(),
  facebook: new firebase.auth.FacebookAuthProvider(),
};

export interface LoginAttempt {
  email: string;
  creds: firebase.auth.AuthCredential;
}

export function useSignIn() {
  // Generated from signInWithPopup method
  const [userCreds, setUserCreds] = useState<firebase.auth.UserCredential>();
  const [firebaseError, setFirebaseError] = useState<firebase.auth.AuthError>();

  // Sutff forwarded to user
  const [error, setError] = useState<string>();

  // To keep track of users credentials to be linked
  const [loginAttempts, setLoginAttempt] = useState<LoginAttempt[]>([]);

  // Whenver function is evaluated, check if user has other accounts to be linked
  // If there are other accounts to be linked, nonchalantly link them
  useEffect(() => {
    const user = userCreds?.user;
    if (!user || loginAttempts.length === 0) return;
    else
      Promise.all(
        loginAttempts
          .filter(({ email }) => email === user.email)
          .map(({ creds }) => user.linkWithCredential(creds))
      )
        .catch(() => undefined)
        .finally(() => setLoginAttempt([]));
  }, [userCreds]);

  // Error handler
  useEffect(() => {
    if (!firebaseError) return setError(undefined);
    else {
      if (
        firebaseError.code === "auth/account-exists-with-different-credential"
      ) {
        const creds = firebaseError.credential!;
        const email = firebaseError.email!;
        setLoginAttempt([...loginAttempts, { email, creds }]);
      }

      errorReducer(firebaseError.code);
      console.error(firebaseError);
    }
  }, [firebaseError]);

  return {
    error,
    providers: Object.keys(providers) as (keyof typeof providers)[],

    signIn: (providerId: keyof typeof providers) => {
      const provider = providers[providerId];
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((userCreds) => setUserCreds(userCreds))
        .catch((error) => setFirebaseError(error));
    },
  };
}
