const AsyncHandler = require('express-async-handler');
const Video = require('../models/videoModel')


const uploadVideo = AsyncHandler(async(req,res)=>{
    const { video,caption, user_id } = req.body;
    const newVideo = await Video.create({
        user:user_id,video,caption
    })

    res.send(newVideo)

})


const getVideos = AsyncHandler(async (req, res) => {
    const videos = await Video.find();
    res.send(videos);
})


module.exports = {
    uploadVideo,
    getVideos
}