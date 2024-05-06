const mongoose = require('mongoose');

const scheduleSchema = mongoose.Schema({
    message: {
        type: String,
        required:true
    },
    date: {
        type: Date,
        required:true
    },
    users: {
        type: Array,
        default:[]
    },
    sender_id: {
        type:mongoose.Schema.Types.ObjectId,
    },
    receiver_id: {
        type:mongoose.Schema.Types.ObjectId,
    },

}, {
    timestamps: true
})

module.exports = mongoose.model('Schedule', scheduleSchema);