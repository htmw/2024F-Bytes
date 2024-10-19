import React, { useState } from "react";

const TranslationOptions = ({ /*languages, sourceLanguage, targetLanguage*/ }) => {
  // const [inputText, setInputText] = useState("");
  // const [outputText, setOutputText] = useState("");
  const [fileUploadNames, setFileUploadNames] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  //const maxFileSize = 3 * 1024 * 1024; // 3MB

  // const translateText = async () => {
  //   if (!sourceLanguage || !targetLanguage || !inputText) {
  //     setOutputText("");
  //     return;
  //   }

  //   const apiUrl = "https://libretranslate.com/translate";
  //   const data = {
  //     q: inputText,
  //     source: sourceLanguage,
  //     target: targetLanguage,
  //     format: "text",
  //   };

  //   try {
  //     const response = await fetch(apiUrl, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     });

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     const result = await response.json();
  //     setOutputText(result.translatedText);
  //   } catch (error) {
  //     console.error("Error translating text:", error);
  //     alert("An error occurred while translating.");
  //   }
  // };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    let newFileUploadNames = [];
    let error = "";

    // files.forEach((file) => {
    //   if (file.size <= maxFileSize && file.type === "audio/mp3") {
    //     newFileUploadNames.push(file.name);
    //   } else if (file.size > maxFileSize) {
    //     error = "Sorry, your file is too large. Maximum limit is 3MB.";
    //   } else {
    //     error = 'Please upload files in ".mp3" format only';
    //   }
    // });

    setFileUploadNames(newFileUploadNames);
    setErrorMessage(error);
    event.target.value = ""; // Clear the input
  };

  const deleteFile = (index) => {
    const updatedFileNames = fileUploadNames.filter((_, i) => i !== index);
    setFileUploadNames(updatedFileNames);
  };

  return (
    <section className="translation-options">
      <div className="file-upload-section">
        <div id="drop-area" className="uploadbox">
          <p>
            Drag and drop or{" "}
            <a href="#" onClick={() => document.getElementById("fileInput").click()}>
              browse
            </a>{" "}
            your files
          </p>
          <input
            type="file"
            id="fileInput"
            multiple
            accept="audio/mpeg"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>
        
        {/* Display file names below the upload box */}
        <ul id="fileUploadName" style={{ listStyleType: 'none', padding: 0 }}>
          {fileUploadNames.length > 0 ? (
            fileUploadNames.map((name, index) => (
              <li key={index}>
                {name} selected{" "}
                <i
                  onClick={() => deleteFile(index)}
                  style={{ color: "red", cursor: "pointer" }}
                >
                  &#10006;
                </i>
              </li>
            ))
          ) : (
            <li>No files selected</li>
          )}
        </ul>

        {/* Display error message below the upload box */}
        {errorMessage && <div className="fileUploadError" style={{ color: "red" }}>{errorMessage}</div>}

        <button className="upload-button">Upload</button>
        <button className="record-button">
          <i className="fas fa-microphone"></i>
        </button>
      </div>
    </section>
  );
};

export default TranslationOptions;
