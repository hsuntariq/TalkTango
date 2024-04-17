const AsyncHandler = require('express-async-handler');
const notificationModel = require('../models/notificationModel');
const getFriendRequests = AsyncHandler(async (req, res) => {
    const user_id = req.params.id ;
    const findNotification = await notificationModel.findOne({ user: user_id });
    if (!findNotification) {
        res.status(404);
        throw new Error('not found')
    } else {
        
        const requests = findNotification?.notifications?.filter((item) => {
            return item.type == 'friend_request'
        })
        res.send(requests);
    }

})


module.exports = {
    getFriendRequests,
}