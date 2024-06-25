const Messages = require("../models/messages");
const asyncHandler = require("express-async-handler")
const {body,validationResult} = require("express-validator")
const { ObjectId} = require('mongodb')

exports.message_find = asyncHandler(async(req,res,next)=>{
    const userId = req.params.id
    try{ // Doesnt this fine id by the userId? So it will never find the messages? Change it to messages.author:id and recipitent:id
        const messageFound = await Messages.find({
            $or: [
                {author: userId},
                {recipient: userId}
            ]
        }).populate("author recipient").exec()
        res.json(messageFound)
    }catch(error){res.status(500).json({message:`Error finding message: ${error}`})}
})

exports.message_find_all = asyncHandler(async(req,res,next)=>{
    try{
        const messagesFound = await Messages.find({}).populate("author recipient").exec() //!Error here
        res.json(messagesFound)
    }catch(error){res.status(500).json({message:`Error fetching messages: ${error}` })}
})

exports.message_create = asyncHandler(async(req,res,next)=>{
    try{
        const newMessage = new Messages({
            author:req.user._id,
            recipient: req.body.id, //! req.body.recpient?
            //body: req.body.body,
        })
       //console.log(newMessage)
        await newMessage.save()
        res.json({message:"Success", id:newMessage._id})
    }catch(error){res.status(500).json({message:`error creating message ${error}`})}
})

exports.message_delete = asyncHandler(async(req,res,next)=>{
    try{
        await Messages.findByIdAndDelete(req.params.id)
        res.json({message:"success"})
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

exports.open_message = async(req,res,next) => {
    const messageId = req.params.id
    try{
        const messageFound = await Messages.findById(messageId).populate("author recipient body.author").exec()
        if(!messageFound){
            res.status(400).json({message: "Message Does not exist"})
        }
        res.json(messageFound)
    }catch(err){
        res.status(500).json({message:`error fetching message: ${err}`})
    }
}

exports.message_append = async(req,res,next) => {
    const messageId = req.params.messageid
    const author = new ObjectId(req.body.author)
    try{
        const newMessage = {author: author, timestamp: Date.now(), message:req.body.message }

        console.log(newMessage)
        const updatedMessage = await Messages.updateOne(
            {_id:messageId},
            {$push : {body: newMessage}});

        if(updatedMessage.matchCount === 0 ){
            throw new Error(`No matching message was found`)
        }

        res.json({message:"message recieved"})
    }catch(error){
        console.error(error)
        res.status(500).json({message:"error sending message"})
    }
}
