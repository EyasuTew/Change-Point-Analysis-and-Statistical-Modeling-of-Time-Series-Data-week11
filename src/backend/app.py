from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import json
import os

app = Flask(__name__)
CORS(app)  # Allow React frontend to connect

DATA_DIR = "data"

# Load once at startup
prices_df = pd.read_csv(os.path.join(DATA_DIR, "brent_cleaned.csv"), parse_dates=["Date"])
events_df = pd.read_csv(os.path.join(DATA_DIR, "events.csv"))
with open(os.path.join(DATA_DIR, "change_points.json"), "r") as f:
    change_points = json.load(f)["change_points"]

@app.route("/api/prices", methods=["GET"])
def get_prices():
    # Optional: ?start=2020-01-01&end=2022-12-31
    start = request.args.get("start")
    end = request.args.get("end")
    
    df = prices_df.copy()
    if start:
        df = df[df["Date"] >= pd.to_datetime(start)]
    if end:
        df = df[df["Date"] <= pd.to_datetime(end)]
    
    return jsonify({
        "dates": df["Date"].dt.strftime("%Y-%m-%d").tolist(),
        "prices": df["Price"].tolist(),
        "log_returns": df["Log_Return"].fillna(0).tolist()
    })

@app.route("/api/events", methods=["GET"])
def get_events():
    return jsonify(events_df.to_dict(orient="records"))

@app.route("/api/change-points", methods=["GET"])
def get_change_points():
    return jsonify(change_points)

if __name__ == "__main__":
    app.run(debug=True, port=5000)