const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username:{type:String, required:true},
    password: {type:String, required:true},
    email: {type:String, required:true},
    contacts:{type:Schema.Types.ObjectId, ref:"User",}, //! Why isnt this showing up on user create
    aboutUser:[
        {
            location:String,
            connect:[{facebook:String},{instagram:String},{twitter:String}],
            profession:String,
            about:String
        }
    ],
    }, {timestamps:true})

UserSchema.virtual("url").get(function(){
    return `/user/${this._id}`
})

module.exports = mongoose.model("User", UserSchema)