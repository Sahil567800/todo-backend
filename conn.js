import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

export const conn = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("database connected")
    } catch (error) {
        console.error(" database connection failed:", error.message);
    }


}

