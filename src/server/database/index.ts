import mongoose from "mongoose"
// @ts-expect-error Cachegoose doesn't really change any types
import cachegoose from "cachegoose"
import { User } from "./models/user"

export default async function init(): Promise<void> {
  cachegoose( mongoose )

  const connected =
    mongoose.connection.readyState === 1 ||
    mongoose.connection.readyState === 2

  if ( connected ) return
  else {
    const dbName = process.env.MONGODB_DBNAME
    const username = process.env.MONGODB_USERNAME
    const password = process.env.MONGODB_PASSWORD

    const connectionString = `mongodb+srv://${ username }:${ password }@sagnik.ewyaf.azure.mongodb.net/${ dbName }?retryWrites=true&w=majority`

    await mongoose.connect( connectionString, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    })

    const resetDatabase = 
      process.env.NODE_ENV === "development" &&
      await User.estimatedDocumentCount() !== 0

    if ( resetDatabase ) {
      await User.deleteMany({})
      console.log( "Cleared database" )

      await User.create({
        name: "root",
        email: "root@gmail.com",
        password: "root",
        school: "No School",
        type: "admin",
      })
      console.log( "Created test account" )
    }
  }
}
