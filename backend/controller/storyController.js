const AsyncHandler = require("express-async-handler");
const Story = require("../models/storyModel");
// function to upload stories

const uploadStory = AsyncHandler(async (req, res) => {
  // get the data from the frontend/body
  const { user, content, caption } = req.body;
  const newStory = await Story.create({
    user,
    content,
    caption,
  });
  res.send(newStory);
});

module.exports = {
  uploadStory,
};
