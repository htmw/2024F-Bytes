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
  const { language } = req.body;
  let content = {};
  if (req.body.content) {
    console.log(req.body.content);
    content = JSON.parse(req.body.content);
  }
  if (!req.file) {
    return res.status(400).json({ error: "Audio file is required" });
  }

  const tempFilePath = path.join(os.tmpdir(), `audio_${Date.now()}.wav`);

  // Save the audio file temporarily
  fs.writeFile(tempFilePath, req.file.buffer, async (err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to save audio file" });
    }

    try {
      // Transcribe and translate the audio file
      if (!content.english_translation || content.english_translation != "") {
        content = await transcribeAndTranslate(tempFilePath);
      }

      // Handle translation if a target language is specified
      if (language !== "en") {
        const translatedText = await translateText(
          content.english_translation,
          "en",
          language
        );
        content.translation = translatedText;
      }
      res.json(content);
    } catch (error) {
      res.status(500).json({ error: error.message || "Internal server error" });
    } finally {
      // Delete the temporary file
      fs.unlink(tempFilePath, (err) => {
        // if (err) console.error("Error deleting temporary file:", err);
      });
    }
  });
});

// Function to handle audio transcription and initial translation
const transcribeAndTranslate = (filePath) => {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn("python3", ["helper.py", filePath]);

    let response = "";

    pythonProcess.stdout.on("data", (data) => {
      response += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      //console.error("Error from Python script:", data.toString());
    });

    pythonProcess.on("close", (code) => {
      if (code !== 0) {
        return reject(
          new Error("Transcription and translation process failed")
        );
      }
      try {
        const parsedResponse = JSON.parse(response);
        resolve(parsedResponse);
      } catch (error) {
        reject(new Error("Error parsing transcription response"));
      }
    });
  });
};

// Function to handle text translation
const translateText = (text, sourceLang, targetLang) => {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn("python3", [
      "helper.py",
      "--text",
      text,
      "--source",
      sourceLang,
      "--target",
      targetLang,
    ]);

    let response = "";

    pythonProcess.stdout.on("data", (data) => {
      response += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      // console.error("Error from Python script:", data.toString());
    });

    pythonProcess.on("close", (code) => {
      if (code !== 0) {
        return reject(new Error("Text translation process failed"));
      }
      try {
        const parsedResponse = JSON.parse(response);
        if (!parsedResponse.success) {
          // Handle failure response from Python
          return reject(new Error(parsedResponse.error));
        }

        resolve(parsedResponse.translation);
      } catch (error) {
        reject(new Error("Error parsing translation response"));
      }
    });
  });
};

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
