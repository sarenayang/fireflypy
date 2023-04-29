import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import {levenshteinEditDistance} from 'levenshtein-edit-distance'
import { useState } from 'react';

const Dictaphone = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  // if (!browserSupportsSpeechRecognition) {
  //   return <span>Browser doesn't support speech recognition.</span>;
  // }
  const [value, setValue] = useState('');

  const handleClick = () => {
    setValue(levenshteinEditDistance(transcript, 'hello')); 
  }
  
  const resetValue = () => {
    setValue('');
  }
  

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      {/* <button onClick={resetValue()}>Reset Score</button> */}
      <p>{transcript}</p>
      <button onClick={handleClick}>Confirm</button>
      <p>{value}</p>
    </div>
  );
};
export default Dictaphone;