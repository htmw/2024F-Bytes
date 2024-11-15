import React, { useState, useRef } from "react";

const HomeComponent = () => {
  const [fileName, setFileName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [file, setFile] = useState();
  const [output, setOutput] = useState();
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      setFileName(files[0].name);
      setFile(files[0]);
      setErrorMessage("");
    }
    event.target.value = "";
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    if (files.length > 0) {
      setFileName(files[0].name);
      setFile(files[0]);
      setErrorMessage("");
    } else {
      setErrorMessage("No files dropped.");
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const translate = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("audioFile", file);
      const response = await fetch("http://localhost:3000/transcribe", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        const res = await response.json();
        setOutput(res);
      } else {
        console.error("Failed to process file");
      }
    } catch (error) {
      console.error("Error while processing file:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteFile = () => {
    setFileName("");
    setFile(null);
    setErrorMessage("");
    setOutput(null);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/mp3" });
        const audioFile = new File([audioBlob], "recording.mp3", {
          type: "audio/mp3",
        });
        setFileName("voiceinput.mp3");
        setFile(audioFile);
        audioChunks.current = [];

        stream.getTracks().forEach((track) => track.stop());
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      setErrorMessage("Unable to access microphone.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 overflow-hidden">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-xl">
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          <div
            id="drop-area"
            className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer flex-1"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => document.getElementById("fileInput").click()}
          >
            <p className="text-gray-600 mb-4">
              Drag and drop or{" "}
              <span className="text-indigo-500 font-semibold underline">
                browse
              </span>{" "}
              your file
            </p>
            <input
              type="file"
              id="fileInput"
              accept="audio/mpeg"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>

          {/* Microphone Button for Recording */}
          <div className="flex justify-center md:justify-start">
            {isRecording ? (
              <button
                className="bg-red-500 text-white rounded-full p-3 shadow hover:bg-red-600 focus:outline-none flex items-center justify-center"
                onClick={stopRecording}
              >
                <i className="fas fa-stop"></i>
              </button>
            ) : (
              <button
                className="bg-gray-500 text-white rounded-full p-3 shadow hover:bg-indigo-600 focus:outline-none flex items-center justify-center"
                onClick={startRecording}
              >
                <i className="fas fa-microphone"></i>
              </button>
            )}
          </div>
        </div>

        <div className="mt-4">
          {fileName ? (
            <div className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-md text-sm">
              <span className="truncate">{fileName}</span>
              <button
                onClick={deleteFile}
                className="text-red-500 hover:text-red-700"
              >
                &#10006;
              </button>
            </div>
          ) : (
            <p className="text-gray-500 text-sm text-center">
              No file selected
            </p>
          )}
        </div>

        {errorMessage && (
          <div className="mt-4 text-red-500 text-sm text-center">
            {errorMessage}
          </div>
        )}

        <div className="mt-6">
          <button
            onClick={translate}
            className={`w-full py-2 px-4 rounded-md shadow text-white ${
              fileName
                ? "bg-indigo-500 hover:bg-indigo-600"
                : "bg-gray-300 cursor-not-allowed"
            }`}
            disabled={!fileName || loading}
          >
            {loading ? (
              <div className="animate-spin border-t-2 border-white w-6 h-6 rounded-full"></div>
            ) : (
              "Translate"
            )}
          </button>
        </div>

        <div className="mt-8 flex space-x-6">
          <div className="flex-1 overflow-hidden">
            {output?.transcription && (
              <div className="border-2 border-gray-300 p-4 rounded-md bg-gray-50 h-full">
                <h3 className="text-lg font-semibold mb-2">Input:</h3>
                <p className="overflow-auto">{output.transcription}</p>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-hidden">
            {output?.translation && (
              <div className="border-2 border-gray-300 p-4 rounded-md bg-gray-50 h-full">
                <h3 className="text-lg font-semibold mb-2">Output:</h3>
                <p className="overflow-auto">{output.translation}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
