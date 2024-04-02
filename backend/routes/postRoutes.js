const express = require('express');
const { createPosts, getPosts, likes, findSinglePost, sharePost, makeComment, getComments } = require('../controller/postController');

const router = express.Router();

router.post('/create-post', createPosts);
router.get('/get-posts', getPosts)
router.post('/like-post', likes)
router.get('/get-single-post', findSinglePost)
router.post('/share-post', sharePost)
router.post('/make-comment', makeComment)
router.post('/get-comments', getComments)


module.exports = router