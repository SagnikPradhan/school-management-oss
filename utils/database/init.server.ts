import mongoose from "mongoose";

let isConnected = false;

export default async function init() {
  if (isConnected) {
    const db = await mongoose.connect(process.env.MONGODB_URI as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    const state = db.connection.readyState;
    isConnected = state === 1 || state === 2;
  }
}
