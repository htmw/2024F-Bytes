import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import SignInDropdown from "./components/SignInDropdown";
// import LanguageSelection from "./components/LanguageSelection";
//import TextBoxes from "./components/TextBoxes";
//import TranslationOptions from "./components/TranslationOptions";
import "./index.css";
import FileDisplay from "./components/FileDisplay";

const App = () => {
  // const [languages, setLanguages] = useState([]);
  // const [sourceLanguage, setSourceLanguage] = useState("");
  // const [targetLanguage, setTargetLanguage] = useState("");

  // useEffect(() => {
  //   fetchLanguages();
  // }, []);

  // const fetchLanguages = async () => {
  //   const apiUrl = "https://libretranslate.com/languages";
  //   try {
  //     const response = await fetch(apiUrl);
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  //     const languagesData = await response.json();
  //     setLanguages(languagesData);
  //     // Set default languages if available
  //     if (languagesData.length > 0) {
  //       setSourceLanguage(languagesData[0]?.code || "");
  //       setTargetLanguage(languagesData[1]?.code || "");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching languages:", error);
  //   }
  // };

  //    const swapLanguages = () => {
  //    setSourceLanguage((prev) => targetLanguage);
  //    setTargetLanguage((prev) => sourceLanguage);
  //  };

  
  return (
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
      <FileDisplay/>
    </div>
  );
};

export default App;
