const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
    user:{
    type:mongoose.Schema.Types.ObjectId,
    required:true
    },
    video: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model('Video',videoSchema);