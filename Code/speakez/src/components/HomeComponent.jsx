import React, { useState, useRef, useEffect } from "react";
import HistoryComponent from "./HistoryComponent";
import languages from "./languages.json";
import { useTheme } from "./ThemeContext"; // Import useTheme

const HomeComponent = () => {
  const [fileName, setFileName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [file, setFile] = useState();
  const [output, setOutput] = useState({});
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [copyMessage, setCopyMessage] = useState("");
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);
  const { isDarkMode } = useTheme();

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      const selectedFile = files[0];
      // Check if file is an MP3 and its size is less than or equal to 20MB
      if (selectedFile.type !== "audio/mpeg") {
        setErrorMessage("Please upload an MP3 file.");
        setFile(null);
        setFileName("");
      } else if (selectedFile.size > 20 * 1024 * 1024) {
        // 20MB in bytes
        setErrorMessage("File size should be less than 20MB.");
        setFile(null);
        setFileName("");
      } else {
        setFileName(selectedFile.name);
        setFile(selectedFile);
        setErrorMessage("");
      }
    }
    event.target.value = "";
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    if (files.length > 0) {
      const selectedFile = files[0];
      // Check if file is an MP3 and its size is less than or equal to 20MB
      if (selectedFile.type !== "audio/mpeg") {
        setErrorMessage("Please upload an MP3 file.");
        setFile(null);
        setFileName("");
      } else if (selectedFile.size > 20 * 1024 * 1024) {
        // 20MB in bytes
        setErrorMessage("File size should be less than 20MB.");
        setFile(null);
        setFileName("");
      } else {
        setFileName(selectedFile.name);
        setFile(selectedFile);
        setErrorMessage("");
      }
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
      formData.append("language", selectedLanguage);
      formData.append("content", JSON.stringify(output));
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
  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };
  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);

    if (!isFavorite && output?.transcription) {
      fetch("http://localhost:3000/favorite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transcription: output.transcription,
          fileName: fileName,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Favorite saved successfully:", data);
        })
        .catch((error) => {
          console.error("Error saving favorite:", error);
        });
    }
  };

  const deleteFile = () => {
    setFileName("");
    setFile(null);
    setErrorMessage("");
    setOutput(null);
  };

  const startRecording = async () => {
    setFileName("");
    setFile(null);
    setErrorMessage("");
    setOutput({});

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

  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopyMessage("Text copied to clipboard!");
        setTimeout(() => setCopyMessage(""), 2000);
      })
      .catch((err) => {
        console.error("Error copying text: ", err);
      });
  };

  const handleDownloadBoth = () => {
    if (output) {
      const content = `Transcription:\n${output.transcription}\n\nTranslation:\n${output.translation}`;
      const blob = new Blob([content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${fileName.split(".")[0]}_output.txt`;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const toggleHistory = () => {
    setIsHistoryVisible((prev) => !prev);
  };

    // Apply different background and text colors based on isDarkMode
    const containerStyle = isDarkMode
    ? "bg-gray-700 text-white"
    : "bg-white text-gray-600";

    const containerStyletextbox = isDarkMode
    ? "bg-gray-300 text-white"
    : "bg-white text-gray-600";

  return (
    <div className={`flex items-center justify-center h-screen overflow-hidden relative ${containerStyle}`}>
      <div className={`bg-white shadow-xl rounded-lg p-8 w-full max-w-xl relative ${containerStyletextbox}`}>
        {copyMessage && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-md shadow-md">
            {copyMessage}
          </div>
        )}

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
        <div className="mt-4">
          <label
            htmlFor="languageSelect"
            className="block text-sm font-semibold text-gray-700"
          >
            Output Language
          </label>
          <select
            id="languageSelect"
            className="w-full py-2 px-4 mt-2 rounded-md border-gray-300"
            onChange={handleLanguageChange}
            value={selectedLanguage}
          >
            {Object.keys(languages).map((langName) => (
              <option key={langName} value={languages[langName]}>
                {langName}
              </option>
            ))}
          </select>
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
              loading ? "bg-gray-500" : "bg-indigo-500 hover:bg-indigo-600"
            }`}
            disabled={loading}
          >
            {loading ? "Translating..." : "Translate"}
          </button>
        </div>

        <div className="mt-4">
          <button
            onClick={toggleHistory}
            className="w-full py-2 px-4 rounded-md bg-indigo-500 text-white hover:bg-indigo-600"
          >
            {isHistoryVisible ? "Hide History" : "Show History"}
          </button>
        </div>

        <div className="mt-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
          <div className="flex-1 overflow-hidden relative">
            {output?.transcription && (
              <div className="border-2 border-gray-300 p-4 rounded-md bg-gray-50 h-full">
                <h3 className="text-lg font-semibold mb-2">Transcription:</h3>
                <p className="overflow-auto">{output.transcription}</p>
                <button
                  onClick={() => handleCopy(output.transcription)}
                  className="absolute top-2 right-2 text-indigo-500 hover:text-indigo-600"
                >
                  <i className="fas fa-copy"></i>
                </button>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-hidden relative">
            {output?.translation && (
              <div className="border-2 border-gray-300 p-4 rounded-md bg-gray-50 h-full">
                <h3 className="text-lg font-semibold mb-2">Translation:</h3>
                <p className="overflow-auto">{output.translation}</p>
                <div className="absolute top-2 right-2 flex space-x-4">
                  <button
                    onClick={() => handleCopy(output.translation)}
                    className="text-indigo-500 hover:text-indigo-600"
                  >
                    <i className="fas fa-copy"></i>
                  </button>
                  <button
                    onClick={handleDownloadBoth}
                    className="text-indigo-500 py-1 px-2 rounded-md"
                  >
                    <i className="fas fa-download"></i>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        className={`absolute top-0 right-0 w-64 h-full bg-white shadow-xl z-20 transform transition-all duration-300 ${
          isHistoryVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <HistoryComponent />
      </div>
    </div>
  );
};

export default HomeComponent;
