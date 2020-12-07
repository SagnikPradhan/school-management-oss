interface BaseUser {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
}

interface Admin extends BaseUser {
  role: "admin";
}

interface SchoolStaff extends BaseUser {
  role: "school-admin" | "teacher";
  school: string;
}

interface Student extends BaseUser {
  role: "student";
  school: string;
  grade: string;
}

export type User = Admin | SchoolStaff | Student;
