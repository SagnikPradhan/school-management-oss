import { useEffect, useRef, useState } from "react";

import * as z from "zod";
import firebase from "lib/utility/firebase";
import { SchoolAdmin } from "lib/types/user";
import { Form } from "lib/components/form";

export default function AdminDashboard() {
  const firestore = firebase.firestore();
  const userCollection = firestore.collection("users");
  const batch = useRef(firestore.batch());

  const [schoolAdmins, setSchoolAdmins] = useState<SchoolAdmin[]>([]);
  const [changesToBeCommited, setChangesToBeCommited] = useState(false);

  useEffect(() => {
    refreshSchoolAdmins();
  }, []);

  const addSchoolAdmin = (email: string, school: string) => {
    const role = "school-admin";
    setSchoolAdmins([...schoolAdmins, { email, school, role }]);
    batch.current.set(userCollection.doc(email), {
      email,
      school,
      role,
    } as SchoolAdmin);
    setChangesToBeCommited(true);
  };

  const deleteSchoolAdmin = (email: string) => {
    setSchoolAdmins(schoolAdmins.filter((u) => u.email !== email));
    batch.current.delete(userCollection.doc(email));
    setChangesToBeCommited(true);
  };

  const refreshSchoolAdmins = () =>
    userCollection
      .where("role", "==", "school-admin")
      .get()
      .then((snapshot) => snapshot.docs.map((snapshot) => snapshot.data()))
      .then((admins) => setSchoolAdmins(admins as SchoolAdmin[]))
      .catch(console.error);

  const commitChanges = () => {
    batch.current
      .commit()
      .then(() => (batch.current = firestore.batch()))
      .then(refreshSchoolAdmins)
      .catch(console.error);
  };

  return (
    <div>
      <ol className="list">
        {schoolAdmins.map(({ email, school, displayName }) => (
          <li>
            {email} {school} {displayName}
            <button onClick={() => deleteSchoolAdmin(email)}>Delete</button>
          </li>
        ))}
      </ol>

      <Form
        values={{
          email: ["", z.string().email(), "email"],
          school: ["", z.string(), "text"],
        }}
        onSubmit={async ({ email, school }) => addSchoolAdmin(email, school)}
      />

      <button disabled={!changesToBeCommited} onClick={commitChanges}>
        Commit
      </button>
    </div>
  );
}
