interface BaseUser {
  email: string;
}

export interface Admin extends BaseUser {
  role: "admin";
}

interface SchoolBaseUser extends BaseUser {
  school: string;
}

export interface SchoolAdmin extends SchoolBaseUser {
  role: "school-admin";
}

export interface SchoolTeacher extends SchoolBaseUser {
  role: "school-teacher";
}

export interface Student extends SchoolBaseUser {
  role: "student";
}

export type SchoolStaff = SchoolAdmin | SchoolTeacher;
export type User = Admin | SchoolStaff | Student;
