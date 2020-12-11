import * as z from "zod";

import { SchoolAdmin } from "lib/types/user";
import { useBatch } from "lib/utility/batch.hook";
import { Form, Field } from "lib/components/form";
import { Table } from "lib/components/table";

export default function AdminDashboard() {
  const users = useBatch<SchoolAdmin>("users", (users) =>
    users.where("role", "==", "school-admin")
  );

  return (
    <div className="page">
      <Table
        headers={{
          email: { header: true },
          school: {},
          delete: { display: false },
        }}
        data={users.data.map(({ email, school }) => ({
          email,
          school,
          delete: (
            <button onClick={() => users.delete(email, "email")}>Delete</button>
          ),
        }))}
      />

      <Form
        id="school-account-add-form"
        initialValues={{ email: "", school: "" }}
        onSubmit={(d) => users.add(d.email, { ...d, role: "school-admin" })}
      >
        <Field name="email" schema={z.string().email()} type="email" />
        <Field name="school" schema={z.string()} type="text" />
      </Form>

      <button form="school-account-add-form" type="submit">
        Add
      </button>
      <button onClick={users.commitAndReset}>Commit</button>
    </div>
  );
}
