import axios from "axios";
const base_url = "http://localhost:5174/api/story";

const uploadStory = async (storyData) => {
  const response = await axios.post(`${base_url}/upload-story`, storyData);
  return response.data;
};
const getStory = async (storyData) => {
  const response = await axios.get(`${base_url}/get-story`, storyData);
  return response.data;
};

export const storyService = {
  uploadStory,
  getStory
};
