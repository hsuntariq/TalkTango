const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true  
    },
    image: {
        type:String,
        default:null,
        required: false,
        
    },
    otp: {
        type: Number,
        requried:false,
        default:null,
        
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);