import mongoose from "mongoose"
import { createSchema, ExtractDoc, ExtractProps, Type, typedModel,  } from "ts-mongoose"
import { hash, compare } from "bcrypt"

const UserType = [ "student", "teacher", "staff", "admin" ] as const

export const UserSchema = createSchema({
  name: Type.string({ required: true, trim: true }),
  email: Type.string({ require: true, trim: true, unique: true }),
  password: Type.string({ required: true, select: false }),
  school: Type.string({ required: true, trim: true }),
  type: Type.string({ required: true, enum: UserType }),
  image: Type.string({ default: "/image" })
})

UserSchema.pre( "save", async function () {
  const user = this as UserDoc
  const hashedPassword = await hash( user.password, 10 )
  user.password = hashedPassword
})

export type UserDoc = ExtractDoc<typeof UserSchema>
export type UserProps = ExtractProps<typeof UserSchema>

const StaticMethods = {
  verifyUser: async function( password: string, user: UserDoc ) {
    return compare( user.password, password )
  }
}

export const User = 
  mongoose.models["users"] as mongoose.Model<UserDoc> & typeof StaticMethods || 
  typedModel( "users", UserSchema, undefined, undefined, StaticMethods )
