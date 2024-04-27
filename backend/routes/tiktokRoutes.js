const express = require('express');
const { uploadVideo } = require('../controller/tiktokController');
const router = express.Router();



router.post('/upload-video',uploadVideo)



module.exports = router;
