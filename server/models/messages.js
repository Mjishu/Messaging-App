const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    author: {type:Schema.Types.ObjectId, ref:"User", required:true} ,
    recipient: {type: Schema.Types.ObjectId, ref:"User", required:true},
    body: [{
        author:{type:Schema.Types.ObjectId, required: true, ref:"User"},
        timestamp:{type:Date, default: Date.now() },
        message:{type:String, required:true}
    }],
    isWithdrawn: {type:Boolean, default:false, required:true}
},{timestamps:true})

messageSchema.virtual("url").get(function(){
    return `/user/${this._id}`
})

module.exports = mongoose.model("Messages", messageSchema)
