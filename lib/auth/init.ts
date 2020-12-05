import { EnhancedStore } from "@reduxjs/toolkit";

import firebase from "lib/utility/firebase";
import { actions as userActions } from "lib/store/slices/user";

export function initAuth(store: EnhancedStore) {
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
      store.dispatch(userActions.update({ email, uid, displayName, photoURL }));
    } else store.dispatch(userActions.update(null));
  });
}
