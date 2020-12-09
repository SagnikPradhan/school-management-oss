import { SchoolUsers } from "lib/components/school-users";
import { SchoolAdmin, SchoolTeacher, Student } from "lib/types/user";

export default function SchoolAdminDashboard({
  admin,
}: {
  admin: SchoolAdmin;
}) {
  return (
    <div>
      <SchoolUsers<SchoolTeacher> role="school-teacher" school={admin.school} />
      <SchoolUsers<Student> role="student" school={admin.school} />
    </div>
  );
}
