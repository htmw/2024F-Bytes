import React, { useState } from "react";

export default function FileDisplay(props) {
  const { file, setFile, deleteSelectedFile, clickTranscribe } = props;
  const [errorMessage, setErrorMessage] = useState(""); // For file upload errors
  const [transcribeErrorMessage, setTranscribeErrorMessage] = useState(""); // For transcribe error

  // Allowed file types and max file size (20MB for example)
  const allowedFileTypes = [".mp3", ".wav"];
  const maxFileSize = 20971520; // 20 MB in bytes calculation = 20 * 1024 * 1024;

  // Handle file selection and validation
  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      // Validate file type and size
      if (
        !allowedFileTypes.some((type) => uploadedFile.name.endsWith(type)) ||
        uploadedFile.size > maxFileSize
      ) {
        setErrorMessage(
          "Invalid file. Please upload a .mp3 or .wav file smaller than 20MB."
        );
        setFile(null); // Reset the file if validation fails
      } else {
        setErrorMessage(""); // Clear file upload error if file is valid
        setFile(uploadedFile); // Set the uploaded file
        setTranscribeErrorMessage(""); // Clear any previous transcribe errors
      }
    }
  };

  // Handler for transcription with error message if no file is selected
  const handleTranscribe = () => {
    if (!file) {
      setTranscribeErrorMessage("Please upload a file before transcribing.");
    } else {
      setTranscribeErrorMessage(""); // Clear any previous error if file exists
      clickTranscribe(); // Proceed with the transcribe action
    }
  };

  return (
    <div>
      <div id="drop-area" className="uploadbox">
        <p>
          Drag and drop <br />
          or{" "}
          <label style={{ cursor: "pointer", color: "white" }}>
            upload
            <input
              onChange={handleFileChange}
              className="hidden"
              style={{ display: "none" }}
              type="file"
              accept=".mp3, .wav"
            />
          </label>
          <br />
          an mp3 or wav file
        </p>
      </div>

      {/* Display error message if file is invalid */}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      {/* Show the file name and x-mark to remove the file */}
      {file ? (
        <div>
          <p>
            <b>Selected file:</b> {file.name}{" "}
            <i
              className="fa-solid fa-xmark"
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => {
                deleteSelectedFile(); // Call the function to delete the file
                setFile(null); // Reset local file state
                setTranscribeErrorMessage(""); // Clear the transcribe error if file is deleted
              }}
            ></i>
          </p>
        </div>
      ) : null}

      {/* Ensure Transcribe button is visible and enabled only if file is selected */}
      <button
        className="sign-in-button"
        onClick={handleTranscribe}
        disabled={!file} // Disable button if no file is selected
      >
        Transcribe
      </button>

      {/* Display error message for transcribe action if no file is selected */}
      {transcribeErrorMessage && (
        <p style={{ color: "red", marginTop: "10px" }}>{transcribeErrorMessage}</p>
      )}
    </div>
  );
}
