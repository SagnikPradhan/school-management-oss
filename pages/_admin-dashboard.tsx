import * as z from "zod";

import { SchoolAdmin } from "lib/types/user";
import { useBatch } from "lib/utility/batch.hook";
import { Form } from "lib/components/form";
import { Table } from "lib/components/table";

export default function AdminDashboard() {
  const users = useBatch<SchoolAdmin>("users", (users) =>
    users.where("role", "==", "school-admin")
  );

  return (
    <div className="page">
      <Table
        headers={{ email: { header: true }, school: {} }}
        data={users.data.map(({ email, school }) => ({
          email,
          school,
        }))}
      />

      <Form
        values={{
          email: ["", z.string().email(), "email"],
          school: ["", z.string(), "text"],
        }}
        onSubmit={async ({ email, school }) =>
          users.add(email, { email, school, role: "school-admin" })
        }
      />

      <button onClick={users.commitAndReset}>Commit</button>
    </div>
  );
}
