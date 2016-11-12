const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");
const {generateMessage, generateLocationMessage} = require("./utils/message");
const {isRealString} = require("./utils/validation");
// const {Users} = require("./utils/users");
const {User} = require("./models/user-model");
const publicPath = path.join(__dirname, '../public');

var {mongoose} = require("./db/mongoose");


var app = express();
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));
var count =0;
io.on('connection', (socket)=> {
    count++;
    console.log(`New user connected! Total users -${count}-`);
  
  
 //JOIN    
    socket.on('join',(params, callback)=> {
        if(!isRealString(params.name) || !isRealString(params.room)) {
           return callback('Name and room name are required');
        }
        
        socket.join(params.room);
       
     
        User.addUser(socket.id, params.name, params.room);
        io.to(params.room).emit('updateUserList',User.getUserListg(params.room));
        
     
    socket.emit('newMessage',generateMessage('Admin','Welcome to chat app'));
   
    socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined.`));
        callback();
    });
    
    socket.on('createMessage',(message, callback)=> {
      var user = User.getUser(socket.id);
      if(user && isRealString(message.text)) {
          io.to(user.room).emit('newMessage',generateMessage(user.name, message.text)); 
      }
        
       
        callback();
    });
    
    socket.on('createLocationMessage',(coords) => {
        var user = User.getUser(socket.id);
        if(user) {
        io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
        
    });
    
    socket.on('disconnect',()=> {
        
       var user = User.removeUser(socket.id);
       if(user) {
           io.to(user.room).emit('updateUserList',User.getUserList(user.room));
           io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left.`))
       }
    });
    
    
    
});


const port = process.env.PORT || 3000;
server.listen(port,()=> {
    console.log(`Server is up on port ${port}`);
});
