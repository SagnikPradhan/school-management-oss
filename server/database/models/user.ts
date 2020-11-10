import { hash, compare } from "bcrypt";
import { model, models, Schema, Document, Model } from "mongoose";

export enum UserType {
  ROOT = 0,
  ADMIN = 1,
  TEACHER = 2,
  STUDENT = 3,
}

export interface User {
  name: string;
  email: string;
  password: string;
  type: UserType;
  school: string;
}

export interface UserDocument extends User, Document {
  hashPassword: () => Promise<void>;
  validatePassword: (password: string) => Promise<boolean>;
}

export type PublicUser = Omit<User, "password">;

const UserSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true, select: false },
  type: { type: Number, required: true },
  school: { type: String, required: true },
});

UserSchema.methods.hashPassword = async function hashPassword() {
  const userInstance = this as UserDocument;
  userInstance.password = await hash(this.password, 10);
};

UserSchema.methods.validatePassword = async function validatePassword(
  password: string
) {
  const userInstance = this as UserDocument;
  return compare(password, userInstance.password);
};

export const UserModel =
  (models.users as Model<UserDocument, {}>) ||
  model<UserDocument>("users", UserSchema);
