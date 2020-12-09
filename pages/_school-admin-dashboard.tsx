import { SchoolUsers } from "lib/components/school-users";
import { SchoolAdmin, SchoolTeacher, Student } from "lib/types/user";

export default function SchoolAdminDashboard({
  admin,
}: {
  admin: SchoolAdmin;
}) {
  return (
    <div>
      <h1>Teachers</h1>
      <SchoolUsers<SchoolTeacher> role="school-teacher" school={admin.school} />
      <hr />

      <h1>Students</h1>
      <SchoolUsers<Student> role="student" school={admin.school} />
    </div>
  );
}
