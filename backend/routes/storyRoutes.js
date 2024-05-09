// apis/routes

const express = require("express");
const { uploadStory } = require("../controller/storyController");
const router = express.Router();

router.post("/upload-story", uploadStory);

module.exports = router;
