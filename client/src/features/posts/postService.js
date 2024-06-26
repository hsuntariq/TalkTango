import axios from "axios";
const base_url = "http://localhost:5174/api/posts";

const postCaption = async (captionData) => {
  const response = await axios.post(`${base_url}/post-caption`, captionData);
  return response.data;
};

const postImage = async (imageData) => {
  const response = await axios.post(`${base_url}/create-post`, imageData);
  return response.data;
};

const getPosts = async () => {
  const response = await axios.get(`${base_url}/get-posts`);
  return response.data;
};

const getComments = async (data) => {
  console.log(data);
  const response = await axios.get(`${base_url}/get-comments/${data.post_id}`);
  return response.data;
};
const makeComment = async (data) => {
  const response = await axios.post(`${base_url}/make-comment`, data);
  return response.data;
};

const likePost = async (likeData) => {
  const response = await axios.post(`${base_url}/like-post`, likeData);
  return response.data;
};

const singlePost = async (data) => {
  const response = await axios.get(
    `http://localhost:5174/api/get-single-post`,
    data
  );
  return response.data;
};

const sharePost = async (data) => {
  const response = await axios.post(`${base_url}/share-post`, data);
  return response.data;
};
const updateComment = async (data) => {
  const response = await axios.put(
    `${base_url}/update-comment/${data.post_id}`,
    data
  );
  return response.data;
};
const deleteComment = async (data) => {
  const response = await axios.delete(
    `${base_url}/delete-comment/${data.post_id}`,
    data
  );
  console.log(response);
  return response.data;
};
const getMyPosts = async (user_id) => {
  const response = await axios.get(`${base_url}/get-my-posts/${user_id}`);
  return response.data;
};

export const postService = {
  postCaption,
  postImage,
  getPosts,
  likePost,
  singlePost,
  sharePost,
  getComments,
  makeComment,
  updateComment,
  deleteComment,
  getMyPosts,
};
