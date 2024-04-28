const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
    user:{
    type:mongoose.Schema.Types.ObjectId,
    required:true
    },
    video: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: false,
        default:'TalkTango'
    },
    likes: {
        type: Array,
        default:[]
    },
    comments: {
        type: Array,
        default:[],
    }
})


module.exports = mongoose.model('Video',videoSchema);