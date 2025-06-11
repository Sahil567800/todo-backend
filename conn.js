import mongoose from "mongoose";

export const conn = async (req, res) => {
    try {
        await mongoose.connect("mongodb://localhost:27017/todo")
            .then(() => {
                console.log("database connected")
            })
    } catch (error) {
        res.status(400).json({
            message: "not connected"
        })
    }


}
conn()
