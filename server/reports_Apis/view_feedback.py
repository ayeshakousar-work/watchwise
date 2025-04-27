from config import MONGO_URI, DB_NAME
from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient(MONGO_URI)
db = client[DB_NAME]

def get_feedback_report_from_db(station_id):
    feedbacks = list(db.feedback_log.find({"station_id": station_id}).sort("timestamp", -1))

    return {
        "station_id": station_id,
        "total_feedbacks": len(feedbacks),
        "feedbacks": [
            {
                "timestamp": fb.get("timestamp"),
                "admin_name": fb.get("admin_name", "unknown"),
                "review": fb.get("review", fb.get("feedback", "")),
                "rating": fb.get("rating", 0)
            }
            for fb in feedbacks
        ]
    }
