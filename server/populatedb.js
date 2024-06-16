const userArgs = process.argv.slice(2);
  
const User = require("./models/User")
const Messages = require("./models/messages")
  
const users = [];
const messages = [];
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createUser();
  await createMessage();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function userCreate(index, username,password,email, contacts) {
  const userDetail = {username:username,password:password,email:email, contacts:contacts};
  const user= new User(userDetail);
  await user.save();
  users[index] = user;
  console.log(`Added user: ${username}`);
}

async function messageCreate(index,author,recipient,body,isWithdrawn){
  const messageDetails = {author:author,recipient:recipient,body:body,isWithdrawn:isWithdrawn}
  const message = new Messages(messageDetails);
  await message.save();
  messages[index] = message;
  console.log(`Added message`)
}

async function createUser() {
  console.log("Adding User");
  await Promise.all([
    // userCreate(0,"/images/Kitchen/kitchen-image", "Kitchen search and find image","Kitchen","Leia Pentskofer")
    userCreate(0,"uniqueName","secure password", "test@email.com"),
    userCreate(1,"uniqueName2","secure password2", "test2@email.com",users[0]),

  ]);
}

async function createMessage(){
  console.log("adding message")
  await Promise.all([
      messageCreate(0,users[0],users[1],"this is a message from user0 to user1")
  ])
}