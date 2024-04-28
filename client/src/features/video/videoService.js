import axios from "axios";
const base_url = 'http://localhost:5174/api/tiktok'


const uploadVideo = async (data) => {
    const response = await axios.post(`${base_url}/upload-video`, data);
    return response.data
}
const getVideos = async (data) => {
    const response = await axios.get(`${base_url}/get-video`);
    return response.data
}



const likeVideo = async (likeData) => {
    const response = await axios.post(`${base_url}/like-video`, likeData)
    return response.data
}


export const videoService = {
    uploadVideo,
    getVideos,
    likeVideo
}