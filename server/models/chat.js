const mongoose = require("mongoose");
const validator = require("validator");
const _ = require("lodash");
var moment = require("moment");

var chatSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    message: {
        type:String
       },
    createdAt: {
        type: String,
        default: moment().format("dddd, MMMM Do YYYY, h:mm:ss a")
      
        }
        
});



// chatSchema.statics.addChat = function(name, message,room) {
//      var chat = new Chat({ name, message, room});
//     chat.save().then((chat)=> {
//             console.log(chat);
//           return chat;
//       },(e)=> {
//           console.log(e);
//       })
//      };
     
chatSchema.statics.removeChat = function(name) {
    var Chat = this;
     Chat.findOneAndRemove({name}).then((name)=>{
          console.log("Chat removed"+ name);
        }).catch((e)=> {
         console.log(e)
     });
};

chatSchema.statics.getUser = function(name) {
    console.log('name from server',name)
        var Chat = this;
        Chat.find({name}).then((chat)=>{
          console.log("User found"+ chat);
        }).catch((e)=> {
         console.log(e)
     });

 };
chatSchema.statics.getUserList = function(room) {
         var Chat = this;
         Chat.find({room}).then((users)=>{
              var namesArray = users.map((user)=> user.name);
                 return namesArray;
         }).catch((e)=> {
             console.log(e);
         });
         
 }

var Chat = mongoose.model('Message', chatSchema);

module.exports = {Chat};