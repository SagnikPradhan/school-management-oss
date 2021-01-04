import { prop } from "@typegoose/typegoose";

export class User {
  @prop()
  public email!: string;

  @prop()
  public username!: string;

  @prop()
  public role!: string;
}
