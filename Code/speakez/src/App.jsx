import React, { useState, useEffect, useRef} from "react";
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
  
  // const [downloading, setDownloading] = useState(false);
  // const [output, setOutput] = useState(null);
  // const [finished, setFinished] = useState(false);

  // /*create a worker reference, to get the ml code running in the background*/
  // const worker = useRef(null);

  // useEffect(() => {
  //   /*if currently there is no worker then create a new one from the whisper.worker.js */
  //   if (!worker.current) {
  //     worker.current = new Worker(
  //       new URL("./utils/whisper.worker.js", import.meta.url),
  //       {
  //         type: "module",
  //       }
  //     );
  //   }
  //   /*switch cases, worker can communicate with the status of the transcription, handles incoming messages from the worker */
  //   const onMessageReceived = async (e) => {
  //     switch (e.data.type) {
  //       case "DOWNLOADING":
  //         setDownloading(true);
  //         console.log("DOWNLOADING");
  //         break;
  //       // case "LOADING":
  //       //   setLoading(true);
  //       //   console.log("LOADING");
  //       //   break;
  //       case "RESULT":
  //         setOutput(e.data.results);
  //         console.log(e.data.results);
  //         break;
  //       case "INFERENCE_DONE":
  //         setFinished(true);
  //         console.log("DONE");
  //         break;
  //     }
  //   };

  //   worker.current.addEventListener("message", onMessageReceived);

  //   // define a cleanup function, to prevent memory leaks
  //   return () =>
  //     worker.current.removeEventListener("message", onMessageReceived);
  // });


  return (
    <Router>
      <div className="App">
        <Header />
        <SignInDropdown />
        {/*<LanguageSelection
        sourceLanguage={sourceLanguage}
        targetLanguage={targetLanguage}
        onSourceChange={(e) => setSourceLanguage(e.target.value)}
        onTargetChange={(e) => setTargetLanguage(e.target.value)}
        onSwap={swapLanguages}
        languages={languages}
      />
      <TextBoxes />*/}
        {/*<TranslationOptions
        languages={languages}
        sourceLanguage={sourceLanguage}
        targetLanguage={targetLanguage}
      />*/}

        {/* Routes for different components */}
        <Routes>
          <Route path="/" element={<FileDisplay /> } />
          <Route path="/fileDisplayTrans" element={<FileDisplayTrans />} />
        </Routes>

        {/*<FileDisplay/>*/}
      </div>
    </Router>
  );
};

export default App;
