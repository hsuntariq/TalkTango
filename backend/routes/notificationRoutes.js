const express = require('express');
const { getFriendRequests } = require('../controller/notificationController');

const router = express.Router();

router.get('/get-requests/:id', getFriendRequests);



module.exports = router