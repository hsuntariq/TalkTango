const express = require('express');
const { uploadVideo, getVideos, likes, makeComment, getComments } = require('../controller/tiktokController');
const router = express.Router();



router.post('/upload-video',uploadVideo)
router.get('/get-video',getVideos)
router.post('/like-video', likes);
router.post('/make-comment',makeComment)
router.get('/get-comments/:id', getComments)


module.exports = router;
