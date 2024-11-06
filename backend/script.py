from flask import Flask, jsonify
import cv2
import numpy as np
import tensorflow as tf
from tensorflow.keras.applications import VGG16
from tensorflow.keras.layers import Flatten, Dense
from ultralytics import YOLO
import os
from flask_cors import CORS
import glob
from flask_socketio import SocketIO, emit

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app)  # Initialize SocketIO

# Define activity labels
labels = ['sitting', 'using_laptop', 'hugging', 'sleeping', 'drinking',
          'clapping', 'dancing', 'cycling', 'calling', 'laughing',
          'eating', 'fighting', 'listening_to_music', 'running', 'texting']

# Define which activities are considered "working"
working_labels = {'sitting', 'using_laptop', 'texting'}

# Load models
weights_path = 'D:/Desktop/Wtchwise/bckend/model/vgg16_model.weights.h5'  # Update with your weights path
yolo_model = YOLO('yolov8n.pt')  # Update this path if needed

def load_vgg_model(weights_path):
    base_model = VGG16(include_top=False, input_shape=(160, 160, 3), pooling="avg", weights='imagenet')
    for layer in base_model.layers:
        layer.trainable = False

    model = tf.keras.Sequential()
    model.add(base_model)
    model.add(Flatten(name='flatten'))
    model.add(Dense(256, activation="relu", name='dense_256'))
    model.add(Dense(512, activation="relu", name='dense_512'))
    model.add(Dense(15, activation="softmax", name='output'))
    model.build((None, 160, 160, 3))
    model.load_weights(weights_path)
    return model

vgg_model = load_vgg_model(weights_path)

@app.route('/process_videos', methods=['GET'])
def process_videos():
    folder_path = 'D:/Desktop/Wtchwise/bckend/input_videos'  # Update with your videos folder path
    video_files = glob.glob(os.path.join(folder_path, "*.mp4"))
    
    # Process each video and generate the required reports
    reports = [process_video(video) for video in video_files]
    return jsonify(reports)

def predict_activity(model, image):
    img = cv2.resize(image, (160, 160))
    img = np.expand_dims(img, axis=0)
    img = tf.keras.applications.vgg16.preprocess_input(img)
    preds = model.predict(img)
    label_index = np.argmax(preds)
    confidence = preds[0][label_index] * 100
    return label_index, confidence

def initialize_chairs(frame):
    results = yolo_model(frame)
    chairs = {}
    chair_count = 1
    for box in results[0].boxes:
        label = int(box.cls.item())
        if label == 56:  # Assuming 56 is the class ID for 'chair'
            x1, y1, x2, y2 = map(int, box.xyxy[0].tolist())
            chairs[f'station{chair_count}'] = (x1, y1, x2, y2)
            chair_count += 1
    return chairs

def calculate_iou(boxA, boxB):
    xA = max(boxA[0], boxB[0])
    yA = max(boxA[1], boxB[1])
    xB = min(boxA[2], boxB[2])
    yB = min(boxA[3], boxB[3])
    interArea = max(0, xB - xA) * max(0, yB - yA)
    boxAArea = (boxA[2] - boxA[0]) * (boxA[3] - boxA[1])
    boxBArea = (boxB[2] - boxB[0]) * (boxB[3] - boxB[1])
    iou = interArea / float(boxAArea + boxBArea - interArea)
    return iou

def process_video(video_path):
    cap = cv2.VideoCapture(video_path)
    fps = cap.get(cv2.CAP_PROP_FPS)
    frame_interval = int(fps / 3)
    success, frame = cap.read()

    chairs = initialize_chairs(frame)
    activity_log = {key: {label: 0 for label in labels} for key in chairs.keys()}
    working_log = {key: {'working': 0, 'not_working': 0} for key in chairs.keys()}
    occupancy_log = {key: 0 for key in chairs.keys()}

    frame_count = 0
    while success:
        if frame_count % frame_interval == 0:
            results = yolo_model(frame)
            for box in results[0].boxes:
                x1, y1, x2, y2 = map(int, box.xyxy[0].tolist())
                person_label = int(box.cls.item())
                if person_label == 0:  # Person detected
                    label_index, confidence = predict_activity(vgg_model, frame[y1:y2, x1:x2])
                    activity_label = labels[label_index]

                    for station, chair_coords in chairs.items():
                        if calculate_iou(chair_coords, (x1, y1, x2, y2)) > 0.5:
                            activity_log[station][activity_label] += 1
                            occupancy_log[station] += 1

                            # Categorize the activity as working or not working
                            if activity_label in working_labels:
                                working_log[station]['working'] += 1
                            else:
                                working_log[station]['not_working'] += 1

        frame_count += 1
        success, frame = cap.read()

    occupied_stations = [station for station, count in occupancy_log.items() if count > 0]
    unoccupied_stations = [station for station in occupancy_log if occupancy_log[station] == 0]

    return {
        "station_activity_report": {
            station: log for station, log in activity_log.items() if occupancy_log[station] > 0
        },
        "working_report": {
            station: working_log[station] for station in occupied_stations
        },
        "station_summary": {
            "total_stations": len(chairs),
            "occupied_stations": occupied_stations,
            "unoccupied_stations": unoccupied_stations
        }
    }

if __name__ == '__main__':
    app.run(debug=True)
