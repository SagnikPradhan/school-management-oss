import { SchoolUsers } from "lib/components/school-users";
import { SchoolAdmin } from "lib/types/user";

export default function AdminDashboard() {
  return <SchoolUsers<SchoolAdmin> role="school-admin" />;
}
