import React, { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import SignInDropdown from "./components/SignInDropdown";
// import LanguageSelection from "./components/LanguageSelection";
//import TextBoxes from "./components/TextBoxes";
//import TranslationOptions from "./components/TranslationOptions";
import "./index.css";
import FileDisplay from "./components/FileDisplay";
import FileDisplayTrans from "./components/FileDisplayTrans";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import { MessageTypes } from "./utils/reference";

const App = () => {
  //const [loading, setLoading] = useState(false);

  const [downloading, setDownloading] = useState(false);
  const [result, setResult] = useState(null);
  const [done, setDone] = useState(false);

  /*create a worker reference, to get the ml code running in the background*/
  const worker = useRef(null);

  useEffect(() => {
    /*if currently there is no worker then create a new one from the whisper.worker.js */
    if (!worker.current) {
      worker.current = new Worker(
        new URL("./utils/whisper.worker.js", import.meta.url),
        {
          type: "module",
        }
      );
    }
    /*switch cases, worker can communicate with the status of the transcription, handles incoming messages from the worker */
    const onMessageReceived = async (e) => {
      switch (e.data.type) {
        case "DOWNLOADING":
          setDownloading(true);
          console.log("DOWNLOADING");
          break;
        // case "LOADING":
        //   setLoading(true);
        //   console.log("LOADING");
        //   break;
        case "RESULT":
          setResult(e.data.results);
          console.log(e.data.results);
          break;
        case "INFERENCE_DONE":
          setDone(true);
          console.log("DONE");
          break;
      }
    };

    worker.current.addEventListener("message", onMessageReceived);

    // define a cleanup function, to prevent memory leaks
    return () =>
      worker.current.removeEventListener("message", onMessageReceived);
  });

  const [file, setFile] = useState(null);

  function deleteSelectedFile() {
    setFile(null);
  }
  async function readFromUploadFile(file) {
    const sampling_rate = 16000;
    const audioContext = new AudioContext({ sampleRate: sampling_rate });
    // reads the audio file and converts it into an array buffer
    const readAudioFile = await file.arrayBuffer();
    // decodes buffer into audio data
    const decodedAudioData = await audioContext.decodeAudioData(readAudioFile);
    // gets audio data from the first channel
    const finalAudioData = decodedAudioData.getChannelData(0);
    // returns processed audio data, transforming the file into a format to manipulate
    return finalAudioData;
  }

  //const navigate = useNavigate();
  const clickTranscribe = async () => {
    // checks for mp3 file or audio file from recording
    if (!file) {
      return;
    }
    // readAudioFrom -> gets the data from the file
    let audio = await readFromUploadFile(file);
    // modal used for transcribe, sends audio data to a web worker for transcription using the whisper-model to do this
    const model_name = `openai/whisper-tiny.en`;
    worker.current.postMessage({
      type: MessageTypes.INFERENCE_REQUEST,
      audio,
      model_name,
    });
  };

  return (
    <div className="App">
      <Header />
      <SignInDropdown />
      {result ? (
        <FileDisplayTrans />
      ) : (
        <FileDisplay
          file={file}
          setFile={setFile}
          clickTranscribe={clickTranscribe}
          deleteSelectedFile={deleteSelectedFile}
        />
      )}
    </div>
  );
};

export default App;
