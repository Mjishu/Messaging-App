const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require("dotenv").config()
const mongoose = require("mongoose")

const app = express();

//* Mongoose Connection

mongoose.set("strictQuery", "false")
const mongoDB = process.env.MONGO_URL;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

//? Routers and app usage

const indexRouter = require("./routes/index");
const userRouter = require("./routes/users");
const messageRouter = require("./routes/messages");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/api", async(req,res)=>{
  try{
    res.json({message:"Connected!"})
  }catch(error){res.status(500).json({message:"Error Connecting"})}
})

app.use("/",indexRouter);
app.use("/user", userRouter);
app.use("/messages", messageRouter)

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
  res.render('error');
});

module.exports = app;
