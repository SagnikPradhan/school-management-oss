import firebase from "lib/utility/firebase";
import { SchoolAdmin } from "lib/types/user";
import { useState } from "react";

export const SchoolAdminList = () => {
  const [schoolAdmins, setSchoolAdmins] = useState<SchoolAdmin[]>([]);

  const firestore = firebase.firestore();
  firestore
    .collection("users")
    .where("role", "==", "school-admin")
    .onSnapshot((collectionSnapshot) => {
      const schoolAdmins = collectionSnapshot.docs.map((ref) =>
        ref.data()
      ) as SchoolAdmin[];
      setSchoolAdmins(schoolAdmins);
    });

  return (
    <ul>
      {schoolAdmins.map(({ uid, email, school }) => (
        <li key={uid}>
          {email} - {school}
        </li>
      ))}
    </ul>
  );
};
