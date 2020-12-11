interface BaseUser {
  uid?: string;
  displayName?: string;
  email: string;
  photoURL?: string;
}

export interface Admin extends BaseUser {
  role: "admin";
}

interface SchoolBaseUser extends BaseUser {
  school: string;
}

export interface SchoolAdmin extends BaseUser, SchoolBaseUser {
  role: "school-admin";
}

export interface SchoolTeacher extends BaseUser, SchoolBaseUser {
  role: "school-teacher";
  subjects?: string[];
}

export interface Student extends BaseUser, SchoolBaseUser {
  role: "student";
  grade?: string;
}

export type SchoolStaff = SchoolAdmin | SchoolTeacher;
export type User = Admin | SchoolStaff | Student;
