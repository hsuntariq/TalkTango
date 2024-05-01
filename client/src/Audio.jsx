import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import ring from './assets/ringtone.mp3'

const Audio = () => {
    const [stream, setStream] = useState(null);
    const [recording, setRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [audioBlob, setAudioBlob] = useState(null);

    const startRecording = async () => {
        try {
            const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            setRecording(true);
            setStream(audioStream);
            const recorder = new MediaRecorder(audioStream);
            setMediaRecorder(recorder);
            const chunks = [];
            recorder.ondataavailable = (e) => {
                chunks.push(e.data);
            };
            recorder.onstop = () => {
                const blob = new Blob(chunks, { type: 'audio/webm' });
                setAudioBlob(blob);
            };
            recorder.start();
        } catch (error) {
            toast.error('Please enable microphone to access this feature');
        }
    };

    const stopRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
            setAudioBlob(null)
            setRecording(false);
            setStream(null);
        }
    };

    return (
        <>
            {recording ? (
                <button onClick={stopRecording} className="bg-red-500 p-3">
                    Stop Recording
                </button>
            ) : (
                <button onClick={startRecording} className="bg-green-500 p-3">
                    Start Recording
                </button>
            )}

            {audioBlob && (
                // <audio controls>
                //     <source src={URL.createObjectURL(audioBlob)} />
                // </audio>
                <AudioPlayer
                    controls
                    src={URL.createObjectURL(audioBlob)}
                />
            )}
            {/* <AudioPlayer
                controls
                src={URL.createObjectURL(audioBlob)}

            // other props here
            /> */}
        </>
    );
};

export default Audio;
