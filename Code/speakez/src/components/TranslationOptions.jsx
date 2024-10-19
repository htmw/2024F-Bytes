import React, { useState } from "react";

const TranslationOptions = () => {
  const [fileUploadNames, setFileUploadNames] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    let newFileUploadNames = [];
    let error = "";
    
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
