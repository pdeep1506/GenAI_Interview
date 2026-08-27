import mongoose from "mongoose"
let isConnected = false;


export const connectDB = async()=>{
     if (isConnected && mongoose.connection.readyState === 1) {
    return;
  }
     try {
    await mongoose.connect(process.env.MONGO_URL);

    isConnected = true;

    console.log("DB connected successfully");
  } catch (error) {
    console.error("Error in connecting DB:", error);
    throw error;
  }
}
