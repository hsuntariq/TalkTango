const mongoose = require('mongoose')

const friendSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    friends: {
        type: Array,
        default:[]
    },
    requested: {
        type: Array,
        default:[]
    },
    
})


module.exports = mongoose.model('Friend',friendSchema);