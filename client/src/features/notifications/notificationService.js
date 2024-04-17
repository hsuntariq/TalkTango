import axios from 'axios'

const base_url = 'http://localhost:5174/api/notifications'

const getRequests = async (user_id) => {
    
    const response = await axios.get(`${base_url}/get-requests/${user_id}`);
    console.log(response)
    return response.data
}




export const notificationService = {
    getRequests
}