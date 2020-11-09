import { getModelForClass, ModelOptions, prop } from "@typegoose/typegoose";

enum UserType {
  STUDENT = "student",
  TEACHER = "teacher",
  STAFF = "staff",
}

@ModelOptions({ options: { customName: "users" } })
class User {
  @prop({ required: true })
  name!: string;

  @prop({ required: true, unique: true })
  email!: string;

  @prop({ enum: UserType })
  type!: string;
}

export const UserModel = getModelForClass(User);
export default UserModel;
