const mongoose = require('mongoose')

const notificationSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    notifications: {
        type: Array,
        default:[]
    }
    
})


module.exports = mongoose.model('Notification',notificationSchema);