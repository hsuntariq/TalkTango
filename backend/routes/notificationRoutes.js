const express = require('express');
const { getFriendRequests } = require('../controller/notificationController');

const router = express.Router();

router.get('/get-requests', getFriendRequests);



module.exports = router