const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username:{type:String, required:true},
    password: {type:String, required:true},
    email:{type:String},
    location:{type:String},
    profession:{type:String},
    about:{type:String}
    //todo Not sure how i should make the connect parts? should i do a object inside of a object ? like this connect:{facebook: "url", X:"url", instagram:"url"}
})

UserSchema.virtual("url").get(function(){
    return `/user/${this._id}`
})

module.exports = mongoose.model("User", UserSchema)