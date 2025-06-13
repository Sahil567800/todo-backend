import mongoose from "mongoose";

export const conn = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/todo")
        console.log("database connected")
    } catch (error) {
        console.error(" database connection failed:", error.message);
    }


}

