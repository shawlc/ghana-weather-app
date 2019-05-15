from flask import Flask
import os
import json

# set the project root directory as the static folder, you can set others.
app = Flask(__name__, static_url_path="/static")

@app.route('/')
def static_file():
    return app.send_static_file('index.html')

@app.route("/model/<float:vol>")
def maskDEM(vol):

    if vol < 50:
        jsonName = "elev10.json"
    elif vol >= 50 and vol <100:
        jsonName = "elev50.json"
    else:
        jsonName = "elev100.json"
    SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
    json_url = os.path.join(SITE_ROOT, 'static', 'flood/'+jsonName)
    return json.load(open(json_url))

if __name__ == "__main__":
    app.run()
