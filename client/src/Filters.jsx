import React, { useEffect, useRef } from "react";

function Filters() {
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchVideoStream = async () => {
      try {
        const response = await fetch("http://localhost:5000/camfilter"); // Adjust the URL as per your Flask server configuration
        const reader = response.body.getReader();
        const stream = new ReadableStream({
          start(controller) {
            const pump = async () => {
              const { done, value } = await reader.read();
              if (done) {
                controller.close();
                return;
              }
              controller.enqueue(value);
              pump();
            };
            pump();
          },
        });
        const videoBlob = new Blob([stream], { type: "video/mp4" });
        const videoURL = URL.createObjectURL(videoBlob);
        videoRef.current.src = videoURL;
      } catch (error) {
        console.error("Error fetching video stream:", error);
      }
    };

    fetchVideoStream();
  }, []);

  return (
    <div>
      <video ref={videoRef} autoPlay muted controls />
    </div>
  );
}

export default Filters;
