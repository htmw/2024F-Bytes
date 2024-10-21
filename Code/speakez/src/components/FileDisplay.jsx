import React from "react";

export default function FileDisplay(props) {
  const { file, setFile, deleteSelectedFile, clickTranscribe } = props;

  // Handler for transcription with alert if no file is selected
  const handleTranscribe = () => {
    if (!file) {
      alert("Please select a file before transcribing."); // Alert if no file is selected
    } else {
      clickTranscribe(); // Call the transcribe function if a file is selected
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
              onChange={(event) => {
                const uploadedFile = event.target.files[0];
                if (uploadedFile) {
                  setFile(uploadedFile); // Update state with the uploaded file
                }
              }}
              className="hidden"
              style={{ display: "none" }}
              type="file"
              accept=".mp3, .wave"
            />
          </label>
          <br />
          a mp3 or wave file
        </p>
      </div>

      {/* Show the file name and xmark to remove the file */}
      {file ? (
        <div>
          <p>
            <b>Selected file:</b> {file.name}{" "}
            <i
              className="fa-solid fa-xmark"
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => {
                deleteSelectedFile(); // Call the function passed from the parent to delete the file
                setFile(null); // This will reset the local file state if needed
              }}
            ></i>
          </p>
        </div>
      ) : null}

      {/* Ensure Transcribe button is visible */}
      <button className="sign-in-button" onClick={handleTranscribe}>
        Transcribe
      </button>
    </div>
  );
}
