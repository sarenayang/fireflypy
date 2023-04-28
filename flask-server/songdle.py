#!/usr/bin/env python
# coding: utf-8

# In[ ]:


get_ipython().system('pip install pyaudio')


# In[1]:


import os 
import speech_recognition as sr
import pyaudio
import random
from Levenshtein import distance


# In[ ]:


def get_audio():
    r = sr.Recognizerzer()
    with sr.Microphone() as source:
        r.adjust_for_ambient_noise(source, duration=1)
        audio = r.listen(source)
        said = ""
        try: 
            said = r.recognize_google(audio)
        except Exception as e:
            print("Exception: " + str(e))
            print("Failed")
    return said

def get_audio_modified():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        r.adjust_for_ambient_noise(source, duration=1)
        audio = r.listen(source)
        said = ""
        try: 
            said = r.recognize_google(audio)
        except Exception as e:
            #print("Exception: " + str(e))
            print("")
    return said


# In[ ]:


print("Listening... ")
text = get_audio()
print(text)
print("Done!")


# In[2]:


def check_correct_title(song, response):
    song = song.lower()
    response = response.lower()
    dist = ratio(song, response, score_cutoff = 0.83)
    if (dist > 0.83):
        print("Congratulations! The song title is correct!")
        return True
    else:
        print("The song title is incorrect.")
        return False
    
def check_correct_artist(artist, response):
    artist = artist.lower()
    response = response.lower()
    dist = ratio(artist, response, score_cutoff = 0.83)
    if (dist > 0.83):
        print("Congratulations! The artist is correct!")
        return True
    else:
        print("The artist is incorrect.")
        return False

def pick_random(playlist):
    song = random.choice(playlist)
    playlist.remove(song)
    return song, playlist

def guess_once(song):
    print("Listening...")
    text = get_audio()
    print("Response: " + text)
    #try: 
    response = text.split(" by ")
    #except:
        #print("Did not include artist name!")
    titleGuess = response[0]
    artistGuess = response[1]
    flag1 = check_correct_title(titleGuess, song[0])
    flag2 = check_correct_artist(artistGuess, song[1])
    points = 0
    if (flag1):
        points += 1
    if (flag2):
        points += 1
    return points

def guess_once_text(song):
    text = input('Enter the song title and the artist: \n')
    response = text.split(" by ")
    titleGuess = response[0]
    artistGuess = response[1]
    if (len(song) > 2):
        print("Invalid input, please try again: ")
    else:
        flag1 = check_correct_title(titleGuess, song[0])
        flag2 = check_correct_artist(artistGuess, song[1])
    points = 0
    if (flag1):
        points += 1
    if (flag2):
        points += 1
    return points

def guess_game(playlist):
    totalPoints = 0
    possiblePoints = len(playlist) * 2
    while (len(playlist)):
        song, playlist = pick_random(playlist)
        print(song)
        totalPoints += guess_once(song)
    print("Thank you for playing! You scored " + str(totalPoints) + " points out of a possible " + str(possiblePoints) + " points!")

def guess_game_text(playlist):
    totalPoints = 0
    possiblePoints = len(playlist) * 2
    while (len(playlist)):
        song, playlist = pick_random(playlist)
        print(song)
        totalPoints += guess_once_text(song)
    print("Thank you for playing! You scored " + str(totalPoints) + " points out of a possible " + str(possiblePoints) + " points!")        


# In[3]:


playlist = [['walk but in a garden', 'illusion'], ['floating ghosts', 'purple cat'], ['clouds', 'bunt'], 
            ['bloom', 'speechless'], ['afloat', 'trashed'], ['fuji', 'albert'], ['don\'t give up', 'amies'],
           ['I am not Lost', 'Nothing to say'], ['walk but in a garden', 'illusion']]


playlist_test = [['walk but in a garden', 'illusion'], ['floating ghosts', 'purple cat']]

#guess_game(playlist_test)


# In[4]:


guess_game(playlist_test)


# In[5]:


import time


    
def get_audio_input():
    print("Listening: ")
    now = time.time()
    future = now + 10
    text = ""
    while time.time() < future and text == "":
        text = get_audio_modified()
    if (text == ""):
        print("No answer recorded!")
    else:
        print("Response Recorded!")
    print(text)


# In[ ]:


get_audio_input()


# In[ ]:


def check_correct_artist_multiple(artist, response):
    artist = artist.lower()
    response = response.lower()
    response = response.split(', ')
    flag = False
    for word in response:
        artist = word.strip()
        if (artist == response):
            flag = True
    if (flag):
        print("Congratulations! The artist is correct!")
    else:
        print("The artist is incorrect.")
        
 