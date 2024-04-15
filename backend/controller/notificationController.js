const AsyncHandler = require('express-async-handler');
const notificationModel = require('../models/notificationModel');
const getFriendRequests = AsyncHandler(async (req, res) => {
    const { user_id } = req.body;
    const findNotification = await notificationModel.findOne({ user: user_id });
    const requests = findNotification.notitifications.find((item) => {
        return item.type == 'friend_request'
    })

    res.send(requests);
})


module.exports = {
    getFriendRequests,
}