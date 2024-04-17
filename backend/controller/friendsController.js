const AsyncHandler = require('express-async-handler')
const Friend = require('../models/Friends')
const User = require('../models/userModel')
const Notification = require('../models/notificationModel')
const addFriend = AsyncHandler(async(req, res) => {
    const { user_id, friend_id } = req.body;
    
    // Find user
    let findUser = await Friend.findOne({ user: user_id });
    let to = await User.findOne({ _id: friend_id });
    // find user notification
    let findNotification = await Notification.findOne({user:friend_id})
    



    if (!findUser) {
        // If user not found, create a new record
        findUser = await Friend.create({
            user: user_id,
            requested: [friend_id],
        });
    } else {
        // If user found, push the friend_id to the existing friends array and save
        if (!findUser.requested) {
            findUser.requested = []; // Initialize requests array if it doesn't exist
        }
        findUser.requested.push(friend_id);
        to.requests.push(user_id);
        await findUser.save();
        await to.save();
    }

    if (!findNotification) {
        findNotification = await Notification.create({
            user: friend_id,
            notifications: [{
                type: 'friend_request',
                from: user_id,
                to:friend_id
            }]
        })
    } else {
        findNotification.notifications.push({
            type: 'friend_request',
            from: user_id,
            to:friend_id
        });
        await findNotification.save();
    }

    res.send(findUser);
});




const acceptRequest = AsyncHandler(async (req, res) => {
    const { user, from } = req.body;
    const findUser = await User.findOne({ _id: user });
    const findFriendList = await Friend.findOne({user: from });
    const notification = await Notification.findOne({user:user});
    const findLoggedUserFriends = await Friend.findOne({user})

    if (!findLoggedUserFriends) {
        await Friend.create({
            user,
            requested: [],
            friends:[from]
        })
    } else {
        findLoggedUserFriends.friends.push(user)
    }

    if (!findUser) {
        throw new Error('User not found')
    } else {
        findUser.requests.pull(from);
        // remove the requested id from the requested array
        findFriendList.requested.pull(user);
        // push the friend id into the friends array from the user's side
        if (!findFriendList.friends.includes(user)) {   
            findFriendList.friends.push(user)
        }
        
        notification.notifications = notification.notifications.filter((item) => !(item.from == from && item.to == user));

        await notification.save()
        await findUser.save()
        await findFriendList.save()
        await findLoggedUserFriends.save()
    }

    res.send(findLoggedUserFriends)
}) 


const cancelRequest = AsyncHandler(async(req,res) => {
    const { user_id, friend_id } = req.body;
    const findUser = await Friend.findOne({ user: user_id });
    if (findUser.requested.includes(friend_id)) {   
        findUser.requested.pull(friend_id);
    }

    await findUser.save()

    res.send(findUser)
})


module.exports = {
    addFriend,
    cancelRequest,
    acceptRequest
}