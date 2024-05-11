// apis/routes

const express = require("express");
const { uploadStory, getStories } = require("../controller/storyController");
const router = express.Router();

router.post("/upload-story", uploadStory);
router.get("/get-story", getStories);

module.exports = router;
