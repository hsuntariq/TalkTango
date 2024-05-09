import cv2 
import cvzone
from flask import Flask, Response, request, send_file
from flask_cors import CORS, cross_origin
import numpy as np
import io

app = Flask(__name__)
CORS(app)

# Initialize variables
cap = cv2.VideoCapture(0)  # Use the index of the camera device
cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
overlay = cv2.imread('sunglass.png', cv2.IMREAD_UNCHANGED)

@app.route('/camfilter')
@cross_origin()
def home():
    if overlay is None:
        print("Error loading overlay image")
        return "Error loading overlay image"

    def generate_frames():
        while True:
            success, frame = cap.read()
            if not success:
                break
            gray_scale = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            faces = cascade.detectMultiScale(gray_scale)
            for (x, y, w, h) in faces:
                overlay_resize = cv2.resize(overlay, (int(w*1.5), int(h*1.5)))
                frame = cvzone.overlayPNG(frame, overlay_resize, [x-45, y-75])
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')



if __name__ == "__main__":
    app.run(debug=True)
