const express = require('express');
const { addFriend, cancelRequest, acceptRequest, getFriendList } = require('../controller/friendsController');
const router = express.Router();

router.post('/add-friend', addFriend)
router.post('/cancel-request', cancelRequest)
router.post('/accept-request', acceptRequest)
router.get('/get-friends/:id', getFriendList)



module.exports = router