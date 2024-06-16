const Messages = require("../models/messages");
const asyncHandler = require("express-async-handler")
const {body,validationResult} = require("express-validator")

exports.message_find = asyncHandler(async(req,res,next)=>{
    try{
        const messageFound = await Messages.findById(req.params.id).populate("author recipient").exec()
        res.json(messageFound)
    }catch(error){res.status(500).json({message:`Error finding message: ${error}`})}
})

exports.message_find_all = asyncHandler(async(req,res,next)=>{
    try{
        const messagesFound = await Messages.find({}).populate("author recipient").exec() //!Error here
        res.json(messagesFound)
    }catch(error){res.status(500).json({message:`Error fetching messages: ${error}`})}
})

exports.message_create = asyncHandler(async(req,res,next)=>{
    try{
        const newMessage = new Messages({
            // author: ,//! Need passport I think for this?
            // recipient:  , //! Passport here too? Idk how id get the recipient yet
            body: req.body.body,
        })
        await newMessage.save()
        res.json({message:"Message was created successfully"})
    }catch(error){res.status(500).json({message:`error creating message ${error}`})}
})

exports.message_delete = asyncHandler(async(req,res,next)=>{
    try{
        await Messages.findByIdAndDelete(req.params.id)
        res.json({message:"Message deleted successfully"})
    }catch(error){
        res.status(500).json({message:`error deleting message: ${error}`})
    }
})

exports.message_update = asyncHandler(async(req,res,next)=>{
    try{
        const newMessage ={
            // author: ,//! Need passport I think for this?
            // recipient:  , //! Passport here too? Idk how id get the recipient yet
            body: req.body.body,
            isWithdrawn: req.body.isWithdrawn
        }
        const messageUpdated = await Messages.findByIdAndUpdate(req.params.id, newMessage);
        console.log(messageUpdated);
        res.json({message:"Message was updated successfully"})
    }catch(error){
        res.status(500).json({message:`error updating message: ${error}`})
    }
})