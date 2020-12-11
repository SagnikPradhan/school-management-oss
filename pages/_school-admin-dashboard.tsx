import * as z from "zod";
import { Form, Field } from "lib/components/form";
import { SchoolAdmin, SchoolTeacher, Student } from "lib/types/user";
import { Table } from "lib/components/table";
import { useBatch } from "lib/utility/batch.hook";

export default function SchoolAdminDashboard({
  admin,
}: {
  admin: SchoolAdmin;
}) {
  const teachers = useBatch<SchoolTeacher>("users", (users) =>
    users.where("role", "==", "school-teacher")
  );

  const students = useBatch<Student>("users", (users) =>
    users.where("role", "==", "student")
  );

  return (
    <div>
      <h1>Teachers</h1>
      <Table
        headers={{ email: { header: true } }}
        data={teachers.data.map(({ email }) => ({ email }))}
      />

      <Form
        id="school-teacher-add-form"
        initialValues={{ email: "" }}
        onSubmit={({ email }) =>
          teachers.add(email, {
            email,
            role: "school-teacher",
            school: admin.school,
          })
        }
      >
        <Field type="email" name="email" schema={z.string().email()} />
      </Form>

      <button form="school-teacher-add-form" type="submit">
        Add teacher
      </button>
      <button onClick={teachers.commitAndReset}>Commit</button>
      <hr />

      <h1>Students</h1>
      <Table
        headers={{ email: { header: true } }}
        data={students.data.map(({ email }) => ({ email }))}
      />

      <Form
        id="student-add-form"
        initialValues={{ email: "" }}
        onSubmit={({ email }) =>
          students.add(email, {
            email,
            role: "student",
            school: admin.school,
          })
        }
      >
        <Field type="email" name="email" schema={z.string().email()} />
      </Form>

      <button form="student-add-form" type="submit">
        Add student
      </button>
      <button onClick={students.commitAndReset}>Commit</button>
    </div>
  );
}
