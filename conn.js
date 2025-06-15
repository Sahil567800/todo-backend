import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

export const conn = async () => {
    try {
        await mongoose.connect("mongodb+srv://sahilskp110:sahil5678@todocluster.pecn54f.mongodb.net/?retryWrites=true&w=majority&appName=TodoCluster")
        console.log("database connected")
    } catch (error) {
        console.error(" database connection failed:", error.message);
    }


}

