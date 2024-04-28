const AsyncHandler = require('express-async-handler');
const Video = require('../models/videoModel')
const {v4:uuidv4} = require('uuid')

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
    const findVideo = await Video.findOne({ _id: video_id });

    if (!findVideo) {
        res.status(404)
        throw new Error('No video found')
    } else {
        findVideo.comments.push({
            user_id, comment, date, id
        })
        await findVideo.save()
        res.send({ user_id, comment, video_id, date, id })
    }

})



const getVideos = AsyncHandler(async (req, res) => {
    const videos = await Video.find();
    res.send(videos);
})


const getComments = async (req, res) => {
    const video_id = req.params.id;
    if (!video_id) {
        res.status(400).json({ error: 'Please provide a video_id' });
        return;
    }

    try {
        const findVideo = await Video.findOne({ _id: video_id }).sort({ 'createdAt': -1 });
        if (!findVideo) {
            res.status(404).json({ error: 'No Video found' });
            return;
        }

        res.json(findVideo.comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Server error' });
    }
};


module.exports = {
    uploadVideo,
    getVideos,
    likes,
    makeComment,
    getComments


}