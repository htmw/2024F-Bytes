const express = require("express");
require("dotenv").config();
const multer = require("multer");
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");
const cors = require("cors");

const upload = multer({ storage: multer.memoryStorage() });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.post("/transcribe", upload.single("audioFile"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Audio file is required" });
  }

  const tempFilePath = path.join(os.tmpdir(), `audio_${Date.now()}`);

  fs.writeFile(tempFilePath, req.file.buffer, (err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to save audio file" });
    }

    transcribeAndTranslate(tempFilePath)
      .then((response) => {
        fs.unlink(tempFilePath, (err) => {
          if (err) console.error("Error deleting file:", err);
        });
        res.json(response);
      })
      .catch((err) => {
        console.error("Error during transcription and translation:", err);
        fs.unlink(tempFilePath, (err) => {
          if (err) console.error("Error deleting file:", err);
        });
        res.status(500).json({ error: "Transcription or translation failed" });
      });
  });
});

const transcribeAndTranslate = (filePath) => {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn("python3", ["helper.py", filePath]);

    let response = "";

    pythonProcess.stdout.on("data", (data) => {
      response += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error("Error:", data.toString());
    });

    pythonProcess.on("close", (code) => {
      if (code !== 0) {
        return reject("Error: Transcription and translation process failed");
      }
      try {
        const parsedResponse = JSON.parse(response);
        resolve(parsedResponse);
      } catch (error) {
        reject("Error parsing response");
      }
    });
  });
};

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
