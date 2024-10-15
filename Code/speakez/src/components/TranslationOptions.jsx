import React, { useState, useEffect } from "react";

const TranslationOptions = () => {
  const [languages, setLanguages] = useState([]);
  const [sourceLanguage, setSourceLanguage] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("");
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [fileUploadNames, setFileUploadNames] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadFilesArray, setUploadFilesArray] = useState([]);
  const maxFileSize = 5 * 1024 * 1024; // 5MB

  useEffect(() => {
    fetchLanguages();
  }, []);

  const fetchLanguages = async () => {
    const apiUrl = "https://libretranslate.com/languages";
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const languagesData = await response.json();
      setLanguages(languagesData);
      setSourceLanguage(languagesData[0]?.code || "");
      setTargetLanguage(languagesData[1]?.code || "");
    } catch (error) {
      console.error("Error fetching languages:", error);
    }
  };

  const swapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    translateText();
  };

  const translateText = async () => {
    if (!sourceLanguage || !targetLanguage || !inputText) {
      setOutputText("");
      return;
    }

    const apiUrl = "https://libretranslate.com/translate";
    const data = {
      q: inputText,
      source: sourceLanguage,
      target: targetLanguage,
      format: "text",
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setOutputText(result.translatedText);
    } catch (error) {
      console.error("Error translating text:", error);
      alert("An error occurred while translating.");
    }
  };

  const handleFileChange = (event) => {
    setErrorMessage("");
    const files = Array.from(event.target.files);
    let newFileUploadNames = [];
    let newUploadFilesArray = [];

    files.forEach((file, index) => {
      if (file.size <= maxFileSize && file.type === "audio/mp3") {
        newFileUploadNames.push(file.name);
        newUploadFilesArray.push(file);
      } else if (file.size > maxFileSize) {
        setErrorMessage("Sorry, your file is too large. Maximum limit is 5MB.");
      } else {
        setErrorMessage('Please upload files in ".mp3" format only');
      }
    });

    setFileUploadNames(newFileUploadNames);
    setUploadFilesArray(newUploadFilesArray);
    event.target.value = ""; // Clear the input
  };

  const deleteFile = (index) => {
    const updatedFiles = uploadFilesArray.filter((_, i) => i !== index);
    const updatedFileNames = fileUploadNames.filter((_, i) => i !== index);
    setUploadFilesArray(updatedFiles);
    setFileUploadNames(updatedFileNames);
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  return (
    <section className="translation-options">
      <div className="language-selection">
        <select value={sourceLanguage} onChange={(e) => setSourceLanguage(e.target.value)}>
          {languages.map((language) => (
            <option key={language.code} value={language.code}>
              {language.name}
            </option>
          ))}
        </select>
        <button className="arrows" onClick={swapLanguages}>
          &#11138;
        </button>
        <select value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)}>
          {languages.map((language) => (
            <option key={language.code} value={language.code}>
              {language.name}
            </option>
          ))}
        </select>
      </div>
      <textarea
        id="inputText"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Enter text to translate..."
      ></textarea>
      <textarea id="outputText" value={outputText} readOnly placeholder="Translated text will appear here..."></textarea>
      <div>
        <div id="drop-area" className="uploadbox">
          <p>Drag and drop or <a href="#" onClick={() => document.getElementById("fileInput").click()}>browse</a> your files</p>
          <input type="file" id="fileInput" multiple accept="audio/mp3" onChange={handleFileChange} style={{ display: "none" }} />
          <ul id="fileUploadName">
            {fileUploadNames.map((name, index) => (
              <li key={index}>
                {name} selected <i onClick={() => deleteFile(index)} style={{ color: "red", cursor: "pointer" }}>&#10006;</i>
              </li>
            ))}
          </ul>
          <div className="fileUploadError">{errorMessage}</div>
        </div>
      </div>
      <button onClick={translateText} className="upload-button">Upload</button>
    </section>
  );
};

export default TranslationOptions;
