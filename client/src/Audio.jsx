import React, { useState } from 'react'
import { toast } from 'react-toastify'
const Audio = () => {
    const [stream, setStream] = useState(null);
    const [recording, setRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [audioChunks, setAudioChunks] = useState([]);
    const chunks = [];
    const startRecording = async () => {
        try {
            const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            setRecording((true))
            setStream(audioStream);
            const recorder = new MediaRecorder(audioStream);
            setMediaRecorder(recorder);
            recorder.ondataavailable = (e) => {
                chunks.push(e.data);
                setAudioChunks([...audioChunks, ...chunks]);
            }
            recorder.start();
        } catch (error) {
            toast.error('Please enable microphone to access this feature')
        }
    }


    const stopRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop()
            setRecording(false);
            setStream(null)
        }
    }


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


            {audioChunks && (
                <>
                    {audioChunks.map((ch, index) => {
                        return <audio controls>
                            <source src={URL.createObjectURL(ch)} />
                        </audio>
                    })}
                </>
            )}

        </>
    )
}

export default Audio