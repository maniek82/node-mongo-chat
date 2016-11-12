var mongoose = require("mongoose");
var ChatMessage = mongoose.model('ChatMessage',{
    text: {
        type: String,
        required: true,
        minlength: 2,
        trim: true
    },
    sentAt: {
      type: Number,
      default: null
    },
    _creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
        
    }
});
module.exports = {
    Ch
};