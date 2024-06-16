const User = require("../models/User")
const asyncHandler = require("express-async-handler")
const {body,validationResult} = require("express-validator")
const bcryptjs = require("bcryptjs")

exports.user_create = asyncHandler(async(req,res,next) => {
    console.log("attempting to make new user")
    try{
        const hashedPassword = await bcryptjs.hash(req.body.password, 10)
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            //todo Where to put for aboutUser and contacts?
        })
        console.log(newUser)
        await newUser.save() 
        res.json({message:`success`})
    }catch(error){
        res.status(500).json({message:`error creating user: ${error}`})
    }
})

exports.user_find_all = asyncHandler(async(req,res,next) => {
    console.log("finding all users")
    try{
        const users = await User.find().populate("contacts").exec()
        res.json(users)
    }catch(error){res.status(500).json({message:`error fetching users ${error}`})}
})

exports.user_find = asyncHandler(async(req,res,next)=>{
    console.log("finding user ")
    try{
        const user = await User.findById(req.params.id).populate("contacts").exec()
        res.json(user)
    }catch(error){res.status(500).json({message:`error fetching user ${error}`})}
})

exports.user_update = asyncHandler(async(req,res,next) => {
    console.log("updating user");
    try{
        const userInfo = {
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            //todo Where to put for aboutUser and contacts?
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id,userInfo)
        console.log(updatedUser);
        res.json({message:"User was updated successfully"});
    }catch(error){res.status(500).json({message: `Error updating user ${error}`})}
})

exports.user_delete = asyncHandler(async(req,res,next)=>{
    console.log("deleting User");
    try{
        await User.findByIdAndDelete(req.params.id)
        res.json({message:`User deleted successfully`})
    }catch(error){res.status(500).json({message:`Error attempting to delete user ${error}`})}
})

// exports.get_user