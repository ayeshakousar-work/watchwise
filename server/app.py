import eventlet
eventlet.monkey_patch()  
from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit
import cv2
import requests
import time
from database.feedback_logger import submit_feedback_to_db
from reports_Apis.occupancy_report import get_occupancy_report_from_db
from reports_Apis.working_report import get_working_report_from_db
from reports_Apis.view_feedback import get_feedback_report_from_db
from reports_Apis.stations import get_station_list
from reports_Apis.stations import get_total_stations
from reports_Apis.activity_report   import get_activity_summary_from_db
from flask_cors import CORS
from buffer_utils import (
    append_to_disk_buffer,
    load_buffer_from_disk,
    delete_disk_buffer,
    activity_buffer,
    buffer_lock,
    process_buffer_every_30_minutes
)
from database.Sign_In import login
import base64
# Setup Flask and SocketIO
app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

COLAB_URL = "https://cf68-34-56-97-221.ngrok-free.app"  

background_task_greenlet = None 

def restore_buffer_once_on_startup():
    global activity_buffer
    restored = load_buffer_from_disk()
    if restored:
        with buffer_lock:
            for entry in restored:
                sid = entry.get("station_id")
                if not sid:
                    continue
                if sid not in activity_buffer:
                    activity_buffer[sid] = []
                activity_buffer[sid].append(entry)
        print("Buffer restored from disk.")

def do_handshake():
    try:
        res = requests.post(f"{COLAB_URL}/handshake", json={"initiate": "yes"})
        print("Handshake:", res.json())
        return res.ok
    except Exception as e:
        print("Handshake failed:", e)
        return False

def send_frame_to_colab(frame):
    _, img_encoded = cv2.imencode(".jpg", frame)
    try:
        res = requests.post(f"{COLAB_URL}/predict", files={"frame": img_encoded.tobytes()})
        return res.json()
    except Exception as e:
        print("Prediction error:", e)
        return {}

def video_loop():
    cap = cv2.VideoCapture(0)
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        
        result = send_frame_to_colab(frame)

        # ✨ New Part: Draw bounding boxes if result has detections
        if isinstance(result, list) and result:
            for station_data in result:
                if 'box' in station_data:
                    x1, y1, x2, y2 = station_data['box']  # Make sure 'box' is a list like [x1, y1, x2, y2]
                    
                    # 🔥 Expand the top (move y1 upward)
                    expand_top = 20  # adjust height increase here
                    y1_new = max(y1 - expand_top, 0)

                    activity = station_data.get('activity', '')
                    cv2.rectangle(frame, (x1, y1_new), (x2, y2), (0, 255, 0), 2)
                    cv2.putText(frame, activity, (x1, max(y1_new - 10, 0)), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

            # 🔥 Existing prediction and buffer logic
            with buffer_lock:
                for station_data in result:
                    print(f"🎯 {station_data['station_id']} →  {station_data['activity']} at {station_data['timestamp']}")
                    socketio.emit("prediction", station_data)
                    append_to_disk_buffer(station_data)

                    if station_data['station_id'] not in activity_buffer:
                        activity_buffer[station_data['station_id']] = []

                    activity_buffer[station_data['station_id']].append(station_data)

        # ✨ New Part: Encode and send the frame after drawing boxes
        _, buffer = cv2.imencode('.jpg', frame)
        frame_base64 = base64.b64encode(buffer).decode('utf-8')
        socketio.emit('video_frame', {'frame': frame_base64})

        time.sleep(0.03)  # Keep your original sleep time

def start_buffer_processing():
    global background_task_greenlet
    if background_task_greenlet is None or background_task_greenlet.dead:
        background_task_greenlet = eventlet.spawn(process_buffer_every_30_minutes)
        print("Buffer processing task started.")
    else:
        print("Buffer processing task is already running.")

@app.route("/")
def index():
    return "Backend Running"

@socketio.on("connect")
def client_connect():
    print("Client connected")

@app.route("/api/submit-feedback", methods=["POST"])
def submit_feedback():
    data = request.json
    result = submit_feedback_to_db(data)
    return jsonify(result)

@app.route('/api/occupancy-summary/<station_id>/<period>', methods=['GET'])
def occupancy_summary(station_id, period):
    selected_date = request.args.get('date')
    
    # Validate date parameter
    if not selected_date:
        return jsonify({"error": "Missing 'date' query parameter"}), 400

    try:
        # Call the method to get the occupancy report
        report = get_occupancy_report_from_db(station_id, period, selected_date)
        return jsonify(report), 200  # Return the report as JSON
    except Exception as e:
        return jsonify({"error": str(e)}), 500  # Handle errors gracefully

@app.route("/api/working-report/<station_id>/<period>", methods=["GET"])
def get_working_report(station_id, period):
    # Get the date from query parameters, if provided
    date = request.args.get("date")

    # Call the function to get the working report, passing the date if provided
    result = get_working_report_from_db(station_id, period, date)

    # Return the result as JSON
    return jsonify(result)


@app.route("/api/feedback-report/<station_id>", methods=["GET"])
def feedback_report(station_id):
    result = get_feedback_report_from_db(station_id)
    return jsonify(result)

@app.get("/api/stations/total")
def total_stations():
    return {"total_stations": get_total_stations()}

@app.get("/api/stations/list")
def station_list():
    return {"station_ids": get_station_list()}

@app.route("/api/login", methods=["POST"])
def login():
    return {"message"}
@app.route('/api/activity_summary', methods=['GET'])
def activity_summary():
    station_id = request.args.get('station_id')
    period = request.args.get('period')  # Example: "2025-04-26" or "week-2025-04-22" or "month-2025-04"

    if not station_id or not period:
        return jsonify({
            "success": False,
            "message": "Missing required parameters: 'station_id' and 'period'."
        }), 400

    try:
        summary = get_activity_summary_from_db(station_id, period)
        return jsonify({
            "success": True,
            "data": summary
        }), 200
    except Exception as e:
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500

if __name__ == "__main__":
    restore_buffer_once_on_startup()

    if do_handshake():
        eventlet.spawn(video_loop)  
        start_buffer_processing()  
        socketio.run(app, port=5000)  
    else:
        print("Cannot start — handshake with Colab failed.")
