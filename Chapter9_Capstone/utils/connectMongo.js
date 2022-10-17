import mongoose from "mongoose";

const connectMongo = async () => mongoose.connect(process.env.MONGO_URI);

export const isConnectedToMongo = async () => {
  try {
    console.log("CONNECTING TO MONGO");
    await connectMongo();
    console.log("CONNECTED TO MONGO");
    return true;
  } catch (error) {
    console.log("ERROR CONNECTING TO MONGO");
    console.log(error);
    return false;
  }
};
