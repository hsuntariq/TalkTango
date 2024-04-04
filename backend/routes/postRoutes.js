const express = require('express');
const { createPosts, getPosts, likes, findSinglePost, sharePost, makeComment, getComments, updateComment, deleteComment } = require('../controller/postController');

const router = express.Router();

router.post('/create-post', createPosts);
router.get('/get-posts', getPosts)
router.post('/like-post', likes)
router.get('/get-single-post', findSinglePost)
router.post('/share-post', sharePost)
router.post('/make-comment', makeComment)
router.get('/get-comments/:id', getComments)
router.put('/update-comment/:id', updateComment)
router.delete('/delete-comment/:id', deleteComment)


module.exports = router