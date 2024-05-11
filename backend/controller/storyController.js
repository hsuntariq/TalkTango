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

const getStories = AsyncHandler(async(req,res)=>{
  const stories = await Story.find().sort({createdAt:-1});
  res.send(stories);
})



module.exports = {
  uploadStory,
getStories
};
