const mongoose = require("mongoose");
const validator = require("validator");
const _ = require("lodash");

var UserSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        unique: true
    },
    room: {
        type:String,
        required: true,
        trim: true,
        minlength:3
       },
    socketId: {
        type: String,
        required: true
        }
        
});

UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject, ['_id','name','room','socket']);
};

 UserSchema.methods.addUser = function(name, room, socket) {
     var user = this;
     user = new User({
            name,
            room,
            socket
        });
       user.save().then((user)=> {
           return user;
       },(e)=> {
           console.log(e);
       })
     };
     
UserSchema.methods.removeUser = function(socket) {
    var user = this;
      user.findOneAndRemove({socket}).then((user)=>{
           console.log("User removed"+ user);
        }).catch((e)=> {
         console.log(e)
     });
};

UserSchema.statics.getUser = function(socket) {
        var User = this;
        User.findOne({socket}).then((user)=>{
           console.log("User found"+ user);
        }).catch((e)=> {
         console.log(e)
     });

 };
UserSchema.methods.getUserList = function(room) {
         var user = this;
         user.find({room}).then((users)=>{
              var namesArray = users.map((user)=> user.name);
                 return namesArray;
         }).catch((e)=> {
             console.log(e);
         });
         
 }

var User = mongoose.model('User', UserSchema);

module.exports = {User};