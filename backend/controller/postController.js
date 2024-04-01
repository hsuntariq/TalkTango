const Post = require('../models/postModel');
const AsyncHandler = require('express-async-handler');
const createPosts = AsyncHandler(async (req, res) => {
    const { user, caption, image } = req.body
    if (!caption || !image) {
        res.status(400)
        throw new Error('Please enter data')
    } else {
        
        try {
            const createdPost = await Post.create({
            caption, image, user
        })
        res.send(createdPost)
    } catch (error) {
        throw new Error(error)
    }

        }

})


const getPosts = AsyncHandler(async (req, res) => {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.send(posts)
})


const likes = AsyncHandler(async (req, res) => {
    const { user_id, post_id } = req.body;
    const foundPost = await Post.findOne({ _id: post_id });
    if (foundPost.likes.includes(user_id)) {
        foundPost.likes.pull(user_id)
    } else {
        foundPost.likes.push(user_id)
    }
    await foundPost.save()
    res.send(foundPost)
})


const findSinglePost = AsyncHandler(async (req, res) => {
    const { post_id } = req.body;
    const foundPost = await Post.findOne({ _id: post_id });
    res.send(foundPost)
})


const sharePost = AsyncHandler(async (req, res) => {
    const { user_id, caption, image } = req.body;
    const sharedPost = await Post.create({
        user: user_id,
        caption,
        image
    })
    res.send(sharedPost)
})


module.exports = {
    createPosts,
    getPosts,
    likes,
    findSinglePost,
    sharePost
}