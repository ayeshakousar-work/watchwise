from datetime import datetime, timedelta
import pytz
from config import MONGO_URI, DB_NAME
from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient(MONGO_URI)
db = client[DB_NAME]

# Define working activities for summing duration
working_activities = {
    "using laptop", "using computer",
    "using mobile", "using phone", "using tablet",
    "reading papers", "using papers", "reading book", "using book"
}

def get_working_report_from_db(station_id, period, date=None):
    # Validate date input
    if date:
        try:
            selected_date = datetime.strptime(date, "%Y-%m-%d")
        except ValueError:
            return {"error": "Invalid date format. Use YYYY-MM-DD."}
    else:
        return {"error": "Date is required."}

    # Karachi timezone
    karachi_tz = pytz.timezone("Asia/Karachi")

    # Calculate the start and end datetimes based on period
    if period == "daily":
        start_datetime = selected_date.replace(hour=8, minute=0, second=0, microsecond=0)
        end_datetime = selected_date.replace(hour=16, minute=0, second=0, microsecond=0)
    elif period == "weekly":
        # Last 7 days including selected_date
        start_date = selected_date - timedelta(days=6)
        start_datetime = start_date.replace(hour=8, minute=0, second=0, microsecond=0)
        end_datetime = selected_date.replace(hour=16, minute=0, second=0, microsecond=0)
    elif period == "monthly":
        start_date = selected_date.replace(day=1)
        if selected_date.month == 12:
            next_month = selected_date.replace(year=selected_date.year + 1, month=1, day=1)
        else:
            next_month = selected_date.replace(month=selected_date.month + 1, day=1)
        last_day_of_month = next_month - timedelta(days=1)

        start_datetime = start_date.replace(hour=8, minute=0, second=0, microsecond=0)
        end_datetime = last_day_of_month.replace(hour=16, minute=0, second=0, microsecond=0)
    else:
        return {"error": "Invalid period. Use 'daily', 'weekly', or 'monthly'."}

    # Query the logs based on 'timestamp' field (not just 'date' string)
    logs = db.activity_log.find({
    "station_id": station_id,
    "block_start_time": {
        "$gte": start_datetime.strftime("%Y-%m-%d %H:%M:%S"),
        "$lte": end_datetime.strftime("%Y-%m-%d %H:%M:%S")
    }
})


    # If no logs found for the given period and station
    if not logs:
        return {
            "station_id": station_id,
            "period": period,
            "message": "No data found for this period."
        }

    # Sum the duration for the working activities
    total_duration = 0
    for log in logs:
        activity = log.get("activity", "").lower()
        duration = log.get("duration", 0)

        # Sum only for working activities
        if activity in working_activities:
            total_duration += duration

    return {
        "station_id": station_id,
        "period": period,
        "total_duration": round(total_duration, 2)  # in seconds
    }
