const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const {body,validationResult} = require("express-validator");
const passport = require("passport");
require("dotenv").config();
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");

exports.user_create = asyncHandler(async(req,res,next) => {
    console.log("attempting to make new user")
    console.log(req.body)
    try{
        const existingUser = await User.findOne({email:req.body.email});
        if(existingUser){  return res.status(400).json({message: "Email already in use"})}

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
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

exports.user_sign_in = async (req, res, next) => { // Gives me an error for trying to log in for some reason and idk why
    try{
    console.log(req.body)
      passport.authenticate('local', (err, user,info) => {
          console.log("Before checking for error")
            if (err) {
                console.error(err)
              const error = new Error(`Error during authentication ${err}`);
              return next(error);
            }
          console.log("before checking if user exsits")
          if(!user){
                console.error(`Authentication failed ${info.message}`)
                return res.status(401).json({message:info.message})
            }
        console.log("Before req.login")
        req.logIn(user, err=>{
            if(err){
                console.error("error during login:",err);
                    return next(err)
                }
                console.log("Sign in successful");
                res.json({message:"success"})
            });
        console.log("end of authenticate")
        })(req, res, next);
        }catch(error){
            console.error(`Unexpected Error: ${error}`)
            next(error)
        }}


exports.user_sign_out = async(req,res,next)=>{
    req.logout((err) => {
        if(err){
            return next(err)
        }
        console.log("logging out")
        res.json({success:true})
    })
}

exports.signed_in_user = async(req,res,next) => {
    try{
        const currentUser = req.user;

        if(!currentUser){
            return res.status(401).json({message: "none"})
        }

        const responseData = {
            username: currentUser.username,
            email: currentUser.email,
            id: currentUser._id,
        }
        res.json(responseData)
    }catch(error){
        console.error(`There was a error in signed_in_user route: ${error}`)
        next(error)
    }
}
