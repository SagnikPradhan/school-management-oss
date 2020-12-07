import { EnhancedStore } from "@reduxjs/toolkit";

import firebase from "lib/utility/firebase";
import { actions as userActions } from "lib/store/slices/user";
import { User } from "lib/types/user";

export function initAuth(store: EnhancedStore) {
  const auth = firebase.auth();
  const firestore = firebase.firestore();

  const users = firestore.collection("users");

  const updateUser = (user?: firebase.UserInfo): void => {
    const setStoreUser = (user?: User) =>
      store.dispatch(userActions.update(user || null));

    const main = async () => {
      if (!user || !user.email) return setStoreUser();

      const userDoc = users.doc(user.email);
      if (!(await userDoc.get()).exists) return setStoreUser();

      const { displayName, email, photoURL, uid } = user;
      await userDoc.update({
        displayName,
        uid,
        email,
        photoURL,
      } as User);

      const userData = (await userDoc.get()).data() as User;
      if (!userData.role) return setStoreUser();
      else return setStoreUser(userData);
    };

    main().catch((err) => console.error(err));
  };

  updateUser(auth.currentUser || undefined);

  auth.onAuthStateChanged((user) => {
    if (user) updateUser(user);
    else updateUser();
  });
}
