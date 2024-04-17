const express = require('express');
const { addFriend, cancelRequest, acceptRequest } = require('../controller/friendsController');
const router = express.Router();

router.post('/add-friend',addFriend)
router.post('/cancel-request',cancelRequest)
router.post('/accept-request',acceptRequest)



module.exports = router