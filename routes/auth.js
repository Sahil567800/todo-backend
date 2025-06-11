import { Router } from "express";
import { User } from "../schema/user.js";
const router = Router()
//sign up

router.post('/signUp',async(req,res)=>{
    try {
        const {email,password,username} = req.body
        const userExist = await User.findOne({email:req.body.email})
        if(userExist){
            return  res.status(400).json({message:"User Already exists"})
        }
        const user = new User({email,password,username})
        await user.save() 
        res.status(201).json({message:"Sign Up Successfully"})
    } catch (error) {
        res.status(400).json({message:"user Already exists"})
    }
})

//Log in
router.post('/login',async(req,res)=>{
    try {
        console.log(req.body)
        const user = await User.findOne({email:req.body.email});
        if(!user){
           return res.status(400).json({message:"Please Sign Up first"})
        }
        const isPasswordCorrect = req.body.password === user.password
        if(!isPasswordCorrect){
          return  res.status(400).json({message:"Password is not correct"})
        }
        const {password,...userData} = user._doc;
          return res.status(200).json({userData})

    } catch (error) {
          res.status(400).json({message:"error"})
    }
})
export default router
