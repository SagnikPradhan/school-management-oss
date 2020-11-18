import mongoose from "mongoose"
import { createSchema, ExtractDoc, ExtractProps, Type, typedModel,  } from "ts-mongoose"
import { hash, compare } from "bcrypt"

const UserType = [ "student", "teacher", "staff", "admin" ] as const

export const UserSchema = createSchema({
  name: Type.string({ required: true, trim: true }),
  email: Type.string({ required: true, trim: true, unique: true }),
  password: Type.string({ required: true, select: false }),
  image: Type.string({ default: "/default-avatar.svg" }),
  
  school: Type.string({ required: true, trim: true }),

  type: Type.string({ required: true, enum: UserType })
})

UserSchema.pre( "save", async function () {
  // Before saving to database hash user password
  const user = this as UserDoc
  const hashedPassword = await hash( user.password, 10 )
  user.password = hashedPassword
})

const StaticMethods = {
  verifyUser: async function( password: string, user: UserDoc ) {
    return compare( user.password, password )
  }
}

type UserModel = mongoose.Model<UserDoc> & typeof StaticMethods
export const User = 
  mongoose.models["users"] as UserModel || 
  typedModel( "users", UserSchema, undefined, undefined, StaticMethods )


export type UserDoc = ExtractDoc<typeof UserSchema>
export type UserProps = ExtractProps<typeof UserSchema>
