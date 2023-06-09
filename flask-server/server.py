"""
code taken from spotipy/examples/app.py

Prerequisites
    pip3 install spotipy Flask Flask-Session
    // from your [app settings](https://developer.spotify.com/dashboard/applications)
    export SPOTIPY_CLIENT_ID=client_id_here
    export SPOTIPY_CLIENT_SECRET=client_secret_here
    export SPOTIPY_REDIRECT_URI='http://127.0.0.1:8080' // must contain a port
    // SPOTIPY_REDIRECT_URI must be added to your [app settings](https://developer.spotify.com/dashboard/applications)
    OPTIONAL
    // in development environment for debug output
    export FLASK_ENV=development
    // so that you can invoke the app outside of the file's directory include
    export FLASK_APP=/path/to/spotipy/examples/app.py
    // on Windows, use `SET` instead of `export`
Run app.py
    python3 app.py OR python3 -m flask run
    NOTE: If receiving "port already in use" error, try other ports: 5000, 8090, 8888, etc...
        (will need to be updated in your Spotify app and SPOTIPY_REDIRECT_URI variable)
"""

import base64
import logging
import os
from urllib.parse import urlencode
import Levenshtein
from flask import Flask, session, request, redirect, jsonify, url_for
from flask_session import Session
from dotenv import load_dotenv
import requests
import spotipy
from flask_cors import CORS
from spotify_client import SpotifyClient
from spotipy.oauth2 import SpotifyClientCredentials
from statistics import mean 
load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.urandom(64)
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_FILE_DIR'] = './.flask_session/'
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

CLIENT_ID = os.getenv("SPOTIPY_CLIENT_ID")
CLIENT_SECRET = os.getenv("SPOTIPY_CLIENT_SECRET")
REDIRECT_URI = os.getenv("SPOTIPY_REDIRECT_URI")

spotify_client = SpotifyClient(os.getenv("SPOTIPY_CLIENT_ID"), os.getenv("SPOTIPY_CLIENT_SECRET"))
song_info = []

@app.route('/')
def index():

    cache_handler = spotipy.cache_handler.FlaskSessionCacheHandler(session)
    auth_manager = spotipy.oauth2.SpotifyOAuth(scope='user-read-currently-playing playlist-modify-private',
                                               cache_handler=cache_handler,
                                               show_dialog=True)

    if request.args.get("code"):
        # Step 2. Being redirected from Spotify auth page
        auth_manager.get_access_token(request.args.get("code"))
        return redirect('/')

    if not auth_manager.validate_token(cache_handler.get_cached_token()):
        # Step 1. Display sign in link when no token
        auth_url = auth_manager.get_authorize_url()
        return f'<h2><a href="{auth_url}">Sign in</a></h2>'

    # Step 3. Signed in, display data
    spotify = spotipy.Spotify(auth_manager=auth_manager)
    return f'<h2>Hi {spotify.me()["display_name"]}, ' \
           f'<small><a href="/sign_out">[sign out]<a/></small></h2>' \
           f'<a href="/playlists">my playlists</a> | ' \
           f'<a href="/currently_playing">currently playing</a> | ' \
        f'<a href="/current_user">me</a>' \

@app.route('/authorize')
def authorize():
    cache_handler = spotipy.cache_handler.FlaskSessionCacheHandler(session)
    scope_list = 'streaming user-read-email user-read-private user-read-playback-state playlist-modify-private user-read-currently-playing'
    auth_manager = spotipy.oauth2.SpotifyOAuth(scope=scope_list,
                                               client_id=os.getenv("SPOTIPY_CLIENT_ID"),
                                               client_secret=os.getenv("SPOTIPY_CLIENT_SECRET"),
                                               cache_handler=cache_handler,
                                               show_dialog=True,
                                               redirect_uri=os.getenv("SPOTIPY_REDIRECT_URI"))
    
    auth_url = auth_manager.get_authorize_url()
    return redirect(auth_url)

@app.route('/callback')
def callback():
    token_url = 'https://accounts.spotify.com/api/token'
    # authorization = 'Basic ' + os.getenv("SPOTIPY_CLIENT_ID") + ':' + os.getenv("SPOTIPY_CLIENT_SECRET")
    redirect_uri = os.getenv("SPOTIPY_REDIRECT_URI")
    # print(request.args['code'])
    # print(authorization)


    encoded_oauth2_tokens = base64.b64encode('{}:{}'.format(CLIENT_ID, CLIENT_SECRET).encode())
    headers = {"Authorization": "Basic {}".format(encoded_oauth2_tokens.decode())}
    body = {'redirect_uri': redirect_uri, 
            'grant_type': 'authorization_code',
            'code': str(request.args.get('code'))}
    post_response = requests.post(token_url,headers=headers,data=body)

    
    if post_response.status_code == 200:
        pr = post_response.json()
        access_token = pr['access_token']
        refresh_token = pr['refresh_token']
        expires_in = pr['expires_in']
        queryParams = {'access_token': access_token, 'refresh_token': refresh_token, 'expires_in': expires_in}
        return redirect('http://localhost:3000?' + urlencode(queryParams))
    else:
        logging.error('getToken:' + str(post_response.status_code))
        return jsonify({'error': 'invalid token'}), 400

@app.route('/add', methods=['POST'])
def add():
    song_info.clear() 
    name = request.get_json()['name']
    song_info.append(name)
    artist = request.get_json()['artists'][0]['name']
    song_info.append(artist)
    # picture = request.get_json()['album']['images'][0]['url']
    # print(picture)
    # song_info.append(picture)
    return name, artist

@app.route('/title_input', methods=['POST'])
def title_input():
    song_answer = ''
    artist_answer = ''
    name = request.get_json()['name']
    artist = request.get_json()['artist']
    points = request.get_json()['points']
    correct_song = song_info[0]
    correct_artist = song_info[1]
    already_guessed = ''
    if (song_info):
        if (check_correct_title(name, song_info[0])):
            song_answer = 'your song guess is the correct answer'
            points+=1
        else:
            song_answer = 'your song guess is the wrong answer'
        if (check_correct_artist(artist, song_info[1])):
            artist_answer = 'your artist guess is the correct answer'
            points+=1
        else:
            artist_answer = 'your artist guess is the wrong answer'
    else:
        already_guessed = 'song already guessed'
        return ''
    song_info.clear()
    # print('guess: ', request.get_json()['name'])
    # print('answer: ', song_info[0])
    return jsonify({'song_guess': name, 
                'artist_guess': artist,
                'song_correct': correct_song,
                'artist_correct': correct_artist,
                'song_answer': song_answer,
                'artist_answer': artist_answer,
                'points': points,
                'already_guessed': already_guessed
                })

@app.route('/title_inputmic', methods=['POST'])
def title_inputmic():
    song_answer = ''
    artist_answer = ''
    fullresponse = request.get_json()['name']
    x = fullresponse.split(' by ')
    name = x[0]
    artist = x[1]
    points = request.get_json()['points']
    correct_song = song_info[0]
    correct_artist = song_info[1]
    already_guessed = ''
    if (song_info):
        if (check_correct_title(name, song_info[0])):
            song_answer = 'your song guess is the correct answer'
            points+=1
        else:
            song_answer = 'your song guess is the wrong answer'
        if (check_correct_artist(artist, song_info[1])):
            artist_answer = 'your artist guess is the correct answer'
            points+=1
        else:
            artist_answer = 'your artist guess is the wrong answer'
    else:
        already_guessed = 'song already guessed'
        return ''
    song_info.clear()
    # print('guess: ', request.get_json()['name'])
    # print('answer: ', song_info[0])

    return jsonify({'song_guess': name, 
                    'artist_guess': artist,
                    'song_correct': correct_song,
                    'artist_correct': correct_artist,
                    'song_answer': song_answer,
                    'artist_answer': artist_answer,
                    'points': points,
                    'already_guessed': already_guessed
                    })

@app.route('/get_valence', methods=['POST'])
def get_valence():
    playlist_id = ''
    print('hi')
    name = request.get_json()['id']
    print(name)
    token = request.get_json()['token']
    username = request.get_json()['username']
    query = "https://api.spotify.com/v1/playlists/" + name + "/tracks"
    response = requests.get(query, data=None, headers={"Authorization": "Bearer {}".format(token)})
    response_json = response.json()
    print(name)
    print(query)
    tracks = ''
    for p in response_json["items"]:
        tracks = tracks + ',' + (p["track"]["id"])
    happiness = []
    valquery = "https://api.spotify.com/v1/audio-features?ids=" + tracks
    valres = requests.get(valquery, data=None, headers={"Authorization": "Bearer {}".format(token)})
    valres_json = valres.json()
    for p in valres_json["audio_features"]:
        if (p != None):
            happiness.append(p['valence'])
    avg = round(mean(happiness),5)
    print(avg)
    return str(avg)



def check_correct_title(song, response):
    song = song.lower()
    response = response.lower()
    dist = Levenshtein.ratio(song, response, score_cutoff = 0.83)
    print(dist)
    if (dist > 0.83):
        return True
    else:
        return False

def check_correct_artist(artist, response):
    artist = artist.lower()
    response = response.lower()
    dist = Levenshtein.ratio(artist, response, score_cutoff = 0.83)
    print(dist)
    if (dist > 0.83):
        return True
    else:
        return False
'''
Following lines allow application to be run more conveniently with
`python app.py` (Make sure you're using python3)
(Also includes directive to leverage pythons threading capacity.)
'''

def generate_token():
    """ Generate the token. Please respect these credentials :) """
    credentials = SpotifyClientCredentials(
        client_id=os.getenv("SPOTIPY_CLIENT_ID"),
        client_secret=os.getenv("SPOTIPY_CLIENT_SECRET"))
    token = credentials.get_access_token()
    return token

if __name__ == '__main__':
    app.run(threaded=True, port=8080)