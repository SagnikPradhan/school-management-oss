import { useEffect, useMemo } from "react";

import firebase from "../firebase/web";
import { initializeStore, State } from "./index";
import { actions as userActions } from "./slices/user";

export function useStore(initialState: State) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);

  useEffect(() => {
    const auth = firebase.auth();

    if (auth.currentUser) {
      const { email, uid, displayName, photoURL } = auth.currentUser;
      store.dispatch(
        userActions.update({
          email,
          uid,
          displayName,
          photoURL,
        })
      );
    }

    auth.onAuthStateChanged((user) => {
      if (user) {
        const { email, uid, displayName, photoURL } = user;
        store.dispatch(
          userActions.update({ email, uid, displayName, photoURL })
        );
      } else store.dispatch(userActions.update(null));
    });
  }, []);

  return store;
}
