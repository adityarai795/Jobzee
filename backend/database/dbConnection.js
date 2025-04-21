import mongoose from "mongoose";


const dbConnect = async () => {
  mongoose.connect(process.env.MONGODB_URI, {
    dbName: "JobPortal",
  }).then(() => {
    console.log("Database connected successfully");
  }
  ).catch((error) => {
    console.log("Database connection failed");
    console.log(error);
  });
}

export default dbConnect;