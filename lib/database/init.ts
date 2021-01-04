import mongoose from "mongoose";

export const init = async () => {
  if (mongoose.connections.length < 0)
    mongoose.connect(process.env.MONGODB_URI, {});
};
