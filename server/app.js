const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

require("dotenv").config();
const mongoose = require("mongoose");

const passport = require("passport");
const bodyparser=  require("body-parser")
const cors = require("cors")
const session = require("express-session")
const MongoStore = require("connect-mongo")
const LocalStrategy = require("passport-local")
const User = require("./models/User.js")
const bcrypt = require("bcrypt")

const app = express();
const port =3002;

//* Mongoose Connection

mongoose.set("strictQuery", "false")
const mongoDB = process.env.MONGO_URL;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}
app.use(session({secret: process.env.SECRET_KEY, resave:false, saveUninitialized:false, store: MongoStore.create({mongoUrl: process.env.MONGO_URL})}))
app.use(passport.initialize());
app.use(passport.session());

//? Routers and app usage
const allowedOrigins = [
    "https://messaging-app-4b6q.onrender.com/",
]

const corsOptions ={
    origin:allowedOrigins,
    credentials:true,
    optionSuccessStatus:200
}

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Authentication
passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, async (username, password, done) => {
    try {
        const user = await User.findOne({ username: username });
        if (!user) {
            return done(null, false, { message: "Incorrect username" });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

passport.serializeUser((user,done)=>{
    done(null,user.id)
})

passport.deserializeUser(async (id,done)=>{
    try{
        const user = await User.findById(id);
        done(null,user);
    }catch(err){done(err)}
})

const indexRouter = require("./routes/index");
const userRouter = require("./routes/users");
const messageRouter = require("./routes/messages");

app.use("/api",indexRouter);
app.use("/api/user", userRouter);
app.use("/api/messages", messageRouter)
//*--------------------
//*---Error Handler----
//*--------------------

app.use(function(req, res, next) {
  next(createError(404));
});


app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);

});

mongoose.connection.once("open", ()=> {
    app.listen(port, () => {console.log(`listening on port ${port}`)})
})


module.exports = app
