# Capstone for Leonard Shaw MSAG 2019

This is a web mapping application for real time weather mapping in Ghana in the context of flood risk.
This application also shows the volume of rainfall that collects in the watershed to the Bagre Dam, releases from which are linked to flooding in Northern Ghana.




This is a Flask application and can be deployed by typing the following commands into your bash terminal:


...

git clone this repository onto your local machine

cd into the repository

python3 -m venv venv

. venv/bin/activate

pip install flask

pip install flask-cors

pip install requests

pip install schedule

export FLASK_APP=serve.py

python -m flask run
...



*This application uses hard coded API keys and thus certain layers will not load if the Flask server is running on multiple local machines.*
*Certain layers and DOM elements are dependent on the websites OpenWeatherMap, DarkSky, and Nominatim being up.*
