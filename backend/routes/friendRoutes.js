const express = require('express');
const { addFriend, cancelRequest } = require('../controller/friendsController');
const router = express.Router();

router.post('/add-friend',addFriend)
router.post('/cancel-request',cancelRequest)



module.exports = router