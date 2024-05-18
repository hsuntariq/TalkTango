import cv2 
import cvzone
from flask import Flask, Response, request, send_file, render_template, jsonify
from flask_cors import CORS, cross_origin
import numpy as np
import io

app = Flask(__name__)
CORS(app)

# Initialize variables
cap = cv2.VideoCapture(0)  # Use the index of the camera device
cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
overlay = cv2.imread('star.png', cv2.IMREAD_UNCHANGED)

@app.route('/')
@cross_origin()
def index():
    return render_template('index.html')

@app.route('/camfilter')
@cross_origin()
def home():
    global overlay
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

@app.route('/screenshot')
@cross_origin()
def screenshot():
    success, frame = cap.read()
    if not success:
        return "Failed to capture image", 500

    gray_scale = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = cascade.detectMultiScale(gray_scale)
    for (x, y, w, h) in faces:
        overlay_resize = cv2.resize(overlay, (int(w*1.5), int(h*1.5)))
        frame = cvzone.overlayPNG(frame, overlay_resize, [x-45, y-75])
    
    _, buffer = cv2.imencode('.png', frame)
    io_buf = io.BytesIO(buffer)
    return send_file(io_buf, mimetype='image/png', as_attachment=True, download_name='screenshot.png')

@app.route('/change_filter')
@cross_origin()
def change_filter():
    global overlay
    filter_name = request.args.get('filter')
    try:
        overlay = cv2.imread(filter_name, cv2.IMREAD_UNCHANGED)
        if overlay is None:
            raise FileNotFoundError(f"Overlay image '{filter_name}' not found")
        return jsonify(success=True)
    except Exception as e:
        return jsonify(success=False, error=str(e))

if __name__ == "__main__":
    app.run(debug=True)
