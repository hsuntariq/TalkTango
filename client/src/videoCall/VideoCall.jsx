import React, { useEffect, useState } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useNavigate } from 'react-router-dom';

const generateRandomID = (len) => {
    let result = '';
    const chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP';
    const maxPos = chars.length;
    len = len || 5;
    for (let i = 0; i < len; i++) {
        result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
};

const VideoCallZego = () => {
    const [roomID, setRoomID] = useState('');
    const navigate = useNavigate();
    let zpInstance; // Declare zpInstance in the outer scope

    useEffect(() => {
        const newRoomID = generateRandomID(5); // Generate a new random room ID
        setRoomID(newRoomID); // Set the room ID state with the new value

        const myMeeting = async (element) => {
            const appID = 663029736;
            const serverSecret = "6d6ce5a3ac1570056d044ba09b879feb";
            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, newRoomID, generateRandomID(5), generateRandomID(5));

            zpInstance = ZegoUIKitPrebuilt.create(kitToken); // Assign the Zego instance to zpInstance
            zpInstance.joinRoom({
                container: element,
                sharedLinks: [
                    {
                        name: 'Personal link',
                        url: window.location.protocol + '//' + window.location.host + window.location.pathname + '?roomID=' + newRoomID,
                    },
                ],
                scenario: {
                    mode: ZegoUIKitPrebuilt.GroupCall,
                },
            });
        };

        const element = document.querySelector('.myCallContainer');
        if (element) {
            myMeeting(element);
        }

        // Clean-up function
        return () => {
            // Clean up Zego instance
            if (zpInstance) {
                // Stop the call or any other necessary cleanup
                zpInstance.stop();
                // Disconnect any event listeners
                // Clear state variables
                setRoomID('');
                // Additional cleanup if needed
            }
        };
    }, []); // Run only once when component mounts

    return (
        <div
            className="myCallContainer"
            style={{ width: '100vw', height: '100vh' }}
        ></div>
    );
};

export default VideoCallZego;
