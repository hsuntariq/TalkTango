const mongoose = require('mongoose');

const chatSchema= mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    chatBG:{
        type:String,
        default:''
    }
})