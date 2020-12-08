import * as z from "zod";
import { Form } from "lib/components/form";
import firebase from "lib/utility/firebase";
import { User } from "../../types/user";

export const SchoolAdminCreationForm = () => {
  const firestore = firebase.firestore();

  return (
    <Form
      values={{
        email: ["", z.string().email(), "email"],
        school: ["", z.string(), "text"],
      }}
      onSubmit={(value, { setSubmitting }) => {
        firestore
          .doc(`/users/${value.email}`)
          .set({
            role: "school-admin",
            email: value.email,
            school: value.school,
          } as User)
          .catch(console.error)
          .finally(() => setSubmitting(false));
      }}
    />
  );
};
