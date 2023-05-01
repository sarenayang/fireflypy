# Firefly Game

A game similar to Wordle, but you guess songs as they play instead.


## Project Description
Using the [Spotify API](https://developer.spotify.com/documentation/web-api) and [Spotify's Developer Dashboard](https://developer.spotify.com/dashboard), this game allows users to login to their accounts, enabling them to control Spotify playback directly in their browser. \
<img width="373" alt="image" src="https://user-images.githubusercontent.com/89556837/235406107-11ca61df-a63e-406d-8710-02bd6a210f74.png"> \
<img width="364" alt="image" src="https://user-images.githubusercontent.com/89556837/235406152-4765fe2f-e01e-4da7-8f5d-bba7f8953122.png"> 

Users are then redirected to the game\
<img width="957" alt="image" src="https://user-images.githubusercontent.com/89556837/235491234-65273782-dcf9-40ad-b1f7-7a0668384e51.png">\
Here, they are able to log out or connect to their Spotify playback using Spotify Connect. Once they are connected, they can play songs and try to guess the song name and song artist, winning points for each one they get correct.

We implemented a speech recoginition feature so that users could make guesses using their voices, utilizing Python libraries such as Levenshtein to process the microphone input. As a backup, we also implemented a keyboard feature so that users could type out their guesses as well, in case we were unsuccessful with the speech recognition feature. 

For this project, we utilized React.js for the frontend and customized the components using Chakra UI. For the backend, which allowed us to authenticate users as well as process user input and return their results, we used Flask, allowing us to use Python libraries for our scripts and processing.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

In the flask-server directory, you can run:

### `python3 server.py`

Runs the backend server.\
Runs on [http://localhost:8080] in development mode.


### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
