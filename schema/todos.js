import mongoose from "mongoose";

const todosSchema = mongoose.Schema({
    todos:{type:String,required:true},
    user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
    }
},
{timestamps:true}
)

export const Todo = mongoose.model("todos",todosSchema)