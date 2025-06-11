import { Todo } from "../schema/todos.js";
import { User } from "../schema/user.js";
import { Router } from "express";
const router = Router()

//addTodo
router.post('/addTodo', async (req, res) => {
    try {
        const { todos, email } = req.body
        const userExist = await User.findOne({ email })
        if (userExist) {
            const newTodo = new Todo({ todos, user: userExist });
            await newTodo.save();
            userExist.todos.push(newTodo);
            await userExist.save()
            res.status(201).json({ newTodo });
        }
        else {
            res.status(400).json({ message: "user does not exist" })
            console.log(error)
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "error" })
    }

})

//updateTodo
router.put('/updateTodo/:id', async (req, res) => {
    try {
        const { todos, email } = req.body
        console.log(req.body)
        const userExist = await User.findOne({ email })
        if (userExist) {
            const updateTodo = await Todo.findByIdAndUpdate(req.params.id, { todos }, { new: true })
            if (!updateTodo) {
                return res.status(404).json({ message: "Todo not found" });
            }
            res.status(200).json({ message: "task updated sucessfully", updateTodo })
        }
        else {
            res.status(400).json({ message: "user does not exist" })
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "user does not exist" })
    }

})

//deleteTodo

router.delete('/deleteTodo/:id', async (req, res) => {
    try {
        const { email } = req.body
        const userExist = await User.findOne({ email })
        if (!userExist) {
            return res.status(400).json({ message: "user does not exist" })
        }
        const deleteTodo = await Todo.findByIdAndDelete(req.params.id)
        if (!deleteTodo) {
            return res.status(404).json({ message: "Todo Not Found" });
        }
        userExist.todos.pull(deleteTodo._id);
        await userExist.save();
        res.status(200).json({ message: "Todo Deleted Succesfully" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" })
    }
})

router.post('/getTodos', async (req, res) => {
    try {
        const { user } = req.body;
        const todos = await Todo.find({ user});
        console.log(todos,"i am todos")
        res.json({ todos });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" })
    }
})
export default router
