import { UserDoc, UserProps } from "workspace/server/database/models/user"

export type ParsedUserDocument = Omit<UserProps, "__v" | "_id">

export function parseUserDocument( model: UserDoc ): ParsedUserDocument {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { __v, _id, ...properties } = model.toJSON() as UserProps
  return { ...properties } 
}
