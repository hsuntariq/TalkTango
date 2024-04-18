import React, { useContext, useEffect, useState } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { AppContext } from '../context/Context';


import io from 'socket.io-client'
const socket = io.connect('http://localhost:5174')

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


const VideoCallZego = ({ onVideoLink }) => {
    const { setVideoLink } = useContext(AppContext);
    const [roomID, setRoomID] = useState('');

    useEffect(() => {
        const newRoomID = generateRandomID(5);
        setRoomID(newRoomID);

        const myMeeting = async (element) => {
            const appID = 663029736;
            const serverSecret = "6d6ce5a3ac1570056d044ba09b879feb";
            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, newRoomID, generateRandomID(5), generateRandomID(5));

            const zpInstance = ZegoUIKitPrebuilt.create(kitToken);
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

            const videoLink = window.location.protocol + '//' + window.location.host + window.location.pathname + '?roomID=' + newRoomID;
            setVideoLink(videoLink);
            onVideoLink(videoLink);

            socket.emit('answer', videoLink)
            // Pass link to parent
        };

        const element = document.querySelector('.myCallContainer');
        if (element) {
            myMeeting(element);
        }

        return () => {
            // Clean up Zego instance if needed
        };
    }, []);

    return (
        <div className="myCallContainer" style={{ width: '100vw', height: '100vh' }}></div>
    );
};

export default VideoCallZego;
