const express = require('express');
const { uploadVideo, getVideos } = require('../controller/tiktokController');
const router = express.Router();



router.post('/upload-video',uploadVideo)
router.get('/get-video',getVideos)



module.exports = router;
