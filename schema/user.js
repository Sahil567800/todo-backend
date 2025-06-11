import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    email : {type:String ,required:true ,unique: true},
    username :  {type:String},
    password : {type:String, required:true},
    todos:[{type:mongoose.Types.ObjectId, ref:"todos"}]
},
{timestamps:true}
)
export const User = mongoose.model("User",userSchema)
