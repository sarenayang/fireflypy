# Firefly Game

A game similar to Wordle, but you guess songs as they play instead.

We created this as some of played a similar game growing up, so we decided to recreate it to be more accessible in the browser.

*CS222 Project created by Aadya Doma, Rachel Tin, Ryan Yang, Sarena Yang*
## Project Description
Using the [Spotify API](https://developer.spotify.com/documentation/web-api) and [Spotify's Developer Dashboard](https://developer.spotify.com/dashboard), this game allows users to login to their accounts, enabling them to control Spotify playback directly in their browser. \
<img width="373" alt="image" src="https://user-images.githubusercontent.com/89556837/235406107-11ca61df-a63e-406d-8710-02bd6a210f74.png"> \
<img width="364" alt="image" src="https://user-images.githubusercontent.com/89556837/235406152-4765fe2f-e01e-4da7-8f5d-bba7f8953122.png"> 

Users are then redirected to the game\
<img width="907" alt="image" src="https://user-images.githubusercontent.com/89556837/236562716-e9424a07-5254-4fdb-abc6-27425730e41f.png">\
Here, they are able to log out or connect to their Spotify playback using Spotify Connect. Once they are connected, they can play songs and try to guess the song name and song artist, winning points for each one they get correct. 

We added a tutorial for user's to be introduced to the game rules. We also added the ability to choose between whether users would like to guess using their keyboard or by using a microphone. Should player's be stuck on a certain song we have implemented a hint feature, which displays the album cover of the song to help players make more informed guesses.

<!--We implemented a speech recoginition feature so that users could make guesses using their voices, utilizing Python libraries such as Levenshtein to process the microphone input. As a backup, we also implemented a keyboard feature so that users could type out their guesses as well, in case we were unsuccessful with the speech recognition feature.-->

We also added a happiness meter, which shows how happy your playlists are depending on what songs are in it.\
<img width="342" alt="image" src="https://user-images.githubusercontent.com/89556837/236563062-63138cc8-2585-4fa2-a6c6-1a03244824d3.png">


For this project, we utilized React.js for the frontend and customized the components using Chakra UI. To login to Spotify, we used OAuth tokens to allow us to make Spotify API requests. The access token it returns is used for all following requests made to the API. For the backend, which allowed us to authenticate users as well as process user input and return their results, we used Flask, allowing us to use Python libraries such as Spotipy and Levenshtein for our scripts and processing, as well as our own code, to send back to the frontend. Flask is also how we made our requests to the Spotify API to retrieve data to send back to the frontend. Below is a rough diagram of how our components interact with each other:\

![image](https://user-images.githubusercontent.com/89556837/236572932-0ab6e0c9-a81c-4c59-9fe5-73f25ccbb1e1.png)


## Available Scripts

After cloning the repo:

*To run the game locally:*

In the project directory, you can run:

### `npm install`

and then

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

In the flask-server directory, you can run:

### `python3 server.py`

Runs the backend server.\
Runs on [http://localhost:8080](http://localhost:8080) in development mode.
 
You should now be able to play the game!

## Contributions
Ryan Yang: Implementing microphone and speech recognition features\
Rachel Tin: Processing user inputs received from the client in the backend and returning results\
Aadya Doma: Implementing and reformatting with Chakra UI components and overall game design\
Sarena Yang: Utilizing the Spotify API to allow user authentication and web browser playback for songs
