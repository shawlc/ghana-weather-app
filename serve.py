from flask import Flask, render_template
from flask import jsonify
from flask_cors import CORS, cross_origin
import os
import json
import requests
import time
import schedule
import datetime


app = Flask(__name__,template_folder='static')
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/')
@cross_origin()
def static_file():
    return render_template('index.html')

@app.route("/weatherghana")
def ghanatask():

    SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
    json_url = os.path.join(SITE_ROOT, 'static', 'js','ghana_cities.json')
    ghana_cities = json.load(open(json_url))

    for city in ghana_cities["features"]:
        id = json.dumps(city["properties"]["id"])
        response = requests.get("http://api.openweathermap.org/data/2.5/weather?id="+id+"&APPID=cbc32ce70a7e7195d25c0083ef418511")
        city["properties"]["value"] = response.json()

    return json.dumps(ghana_cities)

@app.route("/weatherburkina")
def burkinatask():

    SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
    json_url = os.path.join(SITE_ROOT, 'static', 'js','burkina_cities.json')
    ghana_cities = json.load(open(json_url))

    for city in ghana_cities["features"]:
        id = json.dumps(city["properties"]["id"])
        response = requests.get("http://api.openweathermap.org/data/2.5/weather?id="+id+"&APPID=cbc32ce70a7e7195d25c0083ef418511")
        city["properties"]["value"] = response.json()

    return json.dumps(ghana_cities)


schedule.every(2).minutes.do(ghanatask)
time.sleep(60)
schedule.every(2).minutes.do(burkinatask)



if __name__ == "__main__":
    app.run(debug=True)
