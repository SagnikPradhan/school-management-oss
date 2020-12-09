import * as z from "zod";
import { useEffect, useRef, useState } from "react";

import firebase from "lib/utility/firebase";
import { Form, InitalValueWithValidator } from "lib/components/form";
import { SchoolStaff, Student, User } from "lib/types/user";

export const SchoolUsers = <T extends SchoolStaff | Student>({
  role,
  school,
}: {
  role: User["role"];
  school?: string;
}) => {
  const firestore = firebase.firestore();
  const userCollection = firestore.collection("users");
  const batch = useRef(firestore.batch());

  const [users, setUsers] = useState<T[]>([]);
  const [changesToBeCommited, setChangesToBeCommited] = useState(false);

  useEffect(() => {
    refreshUsers();
  }, []);

  const addUser = (email: string, school: string) => {
    setUsers([...users, { email, school, role } as T]);
    batch.current.set(userCollection.doc(email), {
      email,
      school,
      role,
    } as User);
    setChangesToBeCommited(true);
  };

  const deleteUser = (email: string) => {
    setUsers(users.filter((u) => u.email !== email));
    batch.current.delete(userCollection.doc(email));
    setChangesToBeCommited(true);
  };

  const refreshUsers = () => {
    let filteredUsersCollection = userCollection.where("role", "==", role);

    if (school)
      filteredUsersCollection = filteredUsersCollection.where(
        "school",
        "==",
        school
      );

    filteredUsersCollection
      .get()
      .then((snapshot) => snapshot.docs.map((snapshot) => snapshot.data()))
      .then((users) => setUsers(users as T[]))
      .catch(console.error);
  };

  const commitChanges = () => {
    batch.current
      .commit()
      .then(() => (batch.current = firestore.batch()))
      .then(refreshUsers)
      .catch(console.error);
  };

  let fields: InitalValueWithValidator = {
    email: ["", z.string().email(), "email"],
  };

  if (!school) fields.school = ["", z.string(), "text"];

  return (
    <div>
      <ol className="list">
        {users.map((user) => (
          <li>
            {user.email} {school && user.school} {user.displayName}
            <button onClick={() => deleteUser(user.email)}>Delete</button>
          </li>
        ))}
      </ol>

      <Form
        values={fields}
        onSubmit={async (v) => addUser(v.email, v.school || school)}
      />

      <button disabled={!changesToBeCommited} onClick={commitChanges}>
        Commit
      </button>
    </div>
  );
};
