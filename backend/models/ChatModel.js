const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    receiver_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    users: {
        type: Array,
    },
    chat: {
        type: Array,
    },
    chatLock: {
        type:Array,
        default:[]
    }

})

module.exports = mongoose.model('Chat', chatSchema)