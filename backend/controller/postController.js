const Post = require('../models/postModel');
const AsyncHandler = require('express-async-handler');
const { v4: uuidv4 } = require('uuid');
const { registerUser } = require('./userController');
const mongoose = require('mongoose');

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

const makeComment = AsyncHandler(async (req, res) => {
    const { user_id, post_id, comment } = req.body;
    let date = Date.now()
    let id = uuidv4()
    if (!user_id || !post_id || !comment) {
        res.status(400)
        throw new Error('Please add a comment')
    }
    const findPost = await Post.findOne({ _id: post_id });

    if (!findPost) {
        res.status(404)
        throw new Error('No post found')
    } else {
        findPost.comments.push({
            user_id, comment, date, id
        })
        await findPost.save()
        res.send({ user_id, comment, post_id, date, id })
    }

})
const getComments = async (req, res) => {
    const post_id = req.params.id;
    if (!post_id) {
        res.status(400).json({ error: 'Please provide a post_id' });
        return;
    }

    try {
        const findPost = await Post.findOne({ _id: post_id }).sort({ 'createdAt': -1 });
        if (!findPost) {
            res.status(404).json({ error: 'No post found' });
            return;
        }

        res.json(findPost.comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Server error' });
    }
};




const updateComment = AsyncHandler(async (req, res) => {
    const { comment_id, updatedComment } = req.body;
    const postID = new mongoose.Types.ObjectId(req.params.id);


    try {
        // Update the comment using findOneAndUpdate
        const updatedPost = await Post.findOneAndUpdate(
            { _id: postID, 'comments.id': comment_id }, // Find post by ID and comment by comment_id
            { $set: { 'comments.$.comment': updatedComment } }, // Set the updated comment
            { new: true } // Return the updated document
        );

        // Check if the post is found and updated
        if (!updatedPost) {
            return res.status(404).json({ error: 'No post found or comment not updated' });
        }

        // Find the updated comment
        const updatedCommentObject = updatedPost.comments.find(comment => comment.id == comment_id);

        // Send the updated comment as response
        res.json(updatedCommentObject);
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


const deleteComment = AsyncHandler(async (req, res) => {
    const { comment_id } = req.body;
    const postID = new mongoose.Types.ObjectId(req.params.id);

    try {
        const findPost = await Post.findOneAndUpdate(
            { _id: postID, 'comments.id': comment_id }, // Find the post by ID and comment by comment_id
            { $pull: { comments: { id: comment_id } } }, // Remove the comment from the comments array
            { new: true } // Return the updated document
        );

        if (!findPost) {
            res.status(404);
            throw new Error('No Post found');
        }

        res.json(findPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});





module.exports = {
    createPosts,
    getPosts,
    likes,
    findSinglePost,
    sharePost,
    makeComment,
    getComments,
    updateComment,
    deleteComment
}