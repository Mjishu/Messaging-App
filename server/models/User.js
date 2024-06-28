const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username:{type:String, required:true},
    password: {type:String, required:true},
    email: {type:String, required:true},
    contacts:{type:Schema.Types.ObjectId, ref:"User",}, //! Why isnt this showing up on user create
    aboutUser:
        {
            location:String,
            connect:{facebook:String, instagram:String,twitter:String},
            profession:String,
            about:String
        },
    color: {type: String, default: "#6aa8ce"}
    }, {timestamps:true})


UserSchema.virtual("url").get(function(){
    return `/user/${this._id}`
})


//pwd hash
UserSchema.pre("save", async function(next){
    const user = this;
    const hash = await bcrypt.hash(this.password,10)
    this.password = hash;
    next();
});

UserSchema.methods.isValidPassowrd = async function(password){
    const user = this;
    const compare = await bcrypt.compare(password,user.password);

    return compare
}

module.exports = mongoose.model("User", UserSchema)
