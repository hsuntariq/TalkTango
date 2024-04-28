const express = require('express');
const { uploadVideo, getVideos, likes } = require('../controller/tiktokController');
const router = express.Router();



router.post('/upload-video',uploadVideo)
router.get('/get-video',getVideos)
router.post('/like-video', likes);


module.exports = router;
