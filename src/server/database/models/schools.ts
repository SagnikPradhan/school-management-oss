import { createSchema, Type } from "ts-mongoose"

export const SchoolSchema = createSchema({
  name: Type.string({ required: true })
})
