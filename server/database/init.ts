import mongoose from "mongoose";

let isConnected = false;

export default async function init() {
  if (!isConnected) {
    const uri = process.env.MONGODB_URI;

    if (typeof uri !== "string") throw new Error("Invalid DB URI");

    const db = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    const state = db.connection.readyState;
    isConnected = state === 1 || state === 2;
  }
}
