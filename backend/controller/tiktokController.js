const AsyncHandler = require('express-async-handler');
const Video = require('../models/videoModel')


const uploadVideo = AsyncHanler(async(req,res)=>{
    const { video, user_id } = req.body;

})


module.exports = {
    uploadVideo
}