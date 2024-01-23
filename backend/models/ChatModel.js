const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    users: {
        type: Array,
    },
    chat: {
        type: Array,
    }

})

module.exports = mongoose.model('Chat', chatSchema)