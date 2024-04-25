import axios from 'axios'

const base_url = 'http://localhost:5174/api/friends'

const addFriend = async (friendData) => {
    const response = await axios.post(`${base_url}/add-friend`, friendData);
    return response.data
}
const cancelRequest = async (friendData) => {
    const response = await axios.post(`${base_url}/cancel-request`, friendData);
    return response.data
}
const acceptRequest = async (friendData) => {
    const response = await axios.post(`${base_url}/accept-request`, friendData);
    return response.data
}
const getFriends = async (user_id) => {

    const response = await axios.get(`${base_url}/get-friends/${user_id}`);
    return response.data
}



export const friendService = {
    addFriend,
    cancelRequest,
    acceptRequest,
    getFriends
}