import firebase from ".";
import { useEffect, useState } from "react";

const providers = {
  googe: new firebase.auth.GoogleAuthProvider(),
  facebook: new firebase.auth.FacebookAuthProvider(),
};

export function useOAuth() {
  const [
    userCreds,
    setUserCreds,
  ] = useState<firebase.auth.UserCredential | null>(null);

  const [
    firebaseError,
    setFirebaseError,
  ] = useState<firebase.auth.AuthError | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [signedIn, setSignedIn] = useState(false);

  // To keep track of creds to be linked
  const [loginAttempts, setLoginAttempt] = useState<
    {
      email: string;
      creds: firebase.auth.AuthCredential;
    }[]
  >([]);

  // Link all the credentials when signed in
  useEffect(() => {
    const user = userCreds?.user;

    if (!user) return setSignedIn(false);

    if (loginAttempts.length !== 0)
      Promise.allSettled(
        loginAttempts
          .filter(({ email }) => email === user.email)
          .map(({ creds }) => user.linkWithCredential(creds))
      );

    setSignedIn(true);
  }, [userCreds]);

  // Error handler
  useEffect(() => {
    if (!firebaseError) return setError(null);
    else {
      switch (firebaseError.code) {
        case "auth/account-exists-with-different-credential":
          const creds = firebaseError.credential!;
          const email = firebaseError.email!;
          setLoginAttempt([...loginAttempts, { email, creds }]);
          setError(
            "This provider is not linked with your account," +
              " please use the other providers"
          );
          break;

        case "auth/auth-domain-config-required":
          setError("Internal Error - Auth domain config required");
          break;

        case "auth/cancelled-popup-request":
          // Multiple popup requests cause it but the last one works
          setError(null);
          break;

        case "auth/operation-not-allowed":
          setError("Internal Error - Enable the account type");
          break;

        case "auth/operation-not-supported-in-this-environment":
          setError("Internal Error - Invalid environement");
          break;

        case "auth/popup-blocked":
          setError("Popup request was blocked, please enable popups");
          break;

        case "auth/popup-closed-by-user":
          // User closed the popup
          setError(null);
          break;

        case "auth/unauthorized-domain":
          setError("Internal Error - Unauthorized domain");
          break;

        default:
          setError("Unknown Error");
          console.error(firebaseError);
          break;
      }
    }
  }, [firebaseError]);

  return {
    error,
    signedIn,
    providers: Object.keys(providers) as (keyof typeof providers)[],
    signIn: (providerId: keyof typeof providers) => {
      const provider = providers[providerId];
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((userCreds) => setUserCreds(userCreds))
        .catch((err) => setFirebaseError(err));
    },
    signOut: () => {
      firebase
        .auth()
        .signOut()
        .then(() => setSignedIn(false))
        .catch((err) => console.log(err));
    },
  };
}
