import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const VideoCall = () => {
    const [stream, setStream] = useState(null);
    const [otherUser, setOtherUser] = useState(null);
    const [callAccepted, setCallAccepted] = useState(false);
    const socket = useRef();

    useEffect(() => {
        socket.current = io.connect('http://localhost:5174');

        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((mediaStream) => {
                setStream(mediaStream);
            })
            .catch((err) => console.log(err));

        socket.current.on('call-made', ({ signal, from }) => {
            setOtherUser(from);
            setCallAccepted(false);
        });

        socket.current.on('answer-made', ({ signal }) => {
            setCallAccepted(true);
            peer.current.signal(signal);
        });

        return () => {
            socket.current.disconnect();
        };
    }, []);

    const peer = useRef();
    const myVideo = useRef();
    const userVideo = useRef();

    const callUser = (userIdToCall) => {
        console.log(userIdToCall)
        peer.current = new RTCPeerConnection();
        peer.current.addStream(stream);

        peer.current.ontrack = (e) => {
            userVideo.current.srcObject = e.streams[0];
        };

        peer.current.onicecandidate = (e) => {
            if (e.candidate) {
                socket.current.emit('call-user', { userIdToCall, signalData: e.candidate, from: socket.current.id });
            }
        };

        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((mediaStream) => {
                myVideo.current.srcObject = mediaStream;
                mediaStream.getTracks().forEach((track) => peer.current.addTrack(track, mediaStream));
            })
            .catch((err) => console.log(err));
    };

    const answerCall = () => {
        setCallAccepted(true);
        const signalData = null; // Get signal data from the server
        peer.current.signal(signalData);
    };

    const hangUpCall = () => {
        setCallAccepted(false);
        peer.current.close();
    };

    return (
        <div>
            <video ref={myVideo} autoPlay muted />
            <video ref={userVideo} autoPlay />
            {callAccepted ? (
                <button onClick={hangUpCall}>Hang Up</button>
            ) : (
                <button onClick={() => callUser('65d70c42803692b4f4e6fc8f')}>Call</button>
            )}
        </div>
    );
};

export default VideoCall;
