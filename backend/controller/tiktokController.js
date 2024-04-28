const AsyncHandler = require('express-async-handler');
const Video = require('../models/videoModel')


const uploadVideo = AsyncHandler(async(req,res)=>{
    const { video,caption, user_id } = req.body;
    const newVideo = await Video.create({
        user:user_id,video,caption
    })

    res.send(newVideo)

})


const likes = AsyncHandler(async (req, res) => {
    const { user_id, video_id } = req.body;
    const foundVideo = await Video.findOne({ _id: video_id });
    if (foundVideo.likes.includes(user_id)) {
        foundVideo.likes.pull(user_id)
    } else {
        foundVideo.likes.push(user_id)
    }
    await foundVideo.save()
    res.send(foundVideo)
})



const makeComment = AsyncHandler(async (req, res) => {
    const { user_id, video_id, comment } = req.body;
    let date = Date.now()
    let id = uuidv4()
    if (!user_id || !video_id || !comment) {
        res.status(400)
        throw new Error('Please add a comment')
    }
    const findPost = await Video.findOne({ _id: video_id });

    if (!findPost) {
        res.status(404)
        throw new Error('No post found')
    } else {
        findPost.comments.push({
            user_id, comment, date, id
        })
        await findPost.save()
        res.send({ user_id, comment, video_id, date, id })
    }

})



const getVideos = AsyncHandler(async (req, res) => {
    const videos = await Video.find();
    res.send(videos);
})


module.exports = {
    uploadVideo,
    getVideos,
    likes
}