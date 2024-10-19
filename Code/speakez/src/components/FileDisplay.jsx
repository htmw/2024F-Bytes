import React from "react";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MessageTypes } from "../utils/reference";

export default function FileDisplay(props) {
  const {file, setFile, deleteSelectedFile, clickTranscribe} = props;

  return (
    <div>
      <div id="drop-area" className="uploadbox">
        <p>
          Drag and drop <br></br> or{" "}
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

      <button onClick={clickTranscribe}>Transcribe</button>
    </div>
  );
}
