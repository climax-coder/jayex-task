import mongoose, { Mongoose } from "mongoose";
import { initializeData } from "./seed";

const connectDB = async (): Promise<boolean> => {
  try {
    const con: Mongoose = await mongoose.connect(
      process.env.MONGO_URI as string
    );

    console.log(`MongoDB Connected : ${con.connection.host}`);

    initializeData().catch(console.error);

    return true;
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
