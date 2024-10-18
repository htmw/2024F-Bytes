import React from "react";
import { useState } from "react";

export default function FileDisplay() {
  const [file, setFile] = useState(null);
  function deleteSelectedFile() {
    setFile(null);
  }
  return (
    <div>
      <div id="drop-area" className="uploadbox">
        <p>
          Drag and drop{" "}
          {/*<label>
            upload 
            <input
              onChange={(event) => {
                //take first index
                const uploadedFile = event.target.files[0];
                setFile(uploadedFile);
              }}
              className="hidden"
              type="file"
              accept=".mp3, .wave"
            />
          </label>{" "}*/}
          <br></br> or{" "}
          <label style={{ cursor: "pointer", color: "white" }}>
            {" "}
            upload
            <input
              onChange={(event) => {
                const uploadedFile = event.target.files[0];
                setFile(uploadedFile);
              }}
              className="hidden"
              style={{ display: "none" }}
              type="file"
              accept=".mp3, .wave"
            />
          </label>
          <br></br>a mp3 or wave file
        </p>
      </div>
      {/*{file && <p>Selected file: {file.name} </p>}
      <label
          onClick={handleAudioReset}
        >
        <i className="fa-solid fa-xmark"></i>
        </label>*/}

      {file ? (
        <div>
          <p>
            {" "}
            <label onClick={deleteSelectedFile}>
              <i className="fa-solid fa-xmark"></i>
            </label>{" "}
            Selected file: {file.name}
          </p>
        </div>
      ) : null}
    </div>
  );
}
