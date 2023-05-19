import mongoose from "mongoose";

let isConnected = false; // track the connection

export const connectDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB connected");
    return;
  }

  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      dbName: "recipehub",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;

    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
