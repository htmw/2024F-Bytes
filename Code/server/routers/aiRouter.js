// routes/aiRouter.js
const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const aiController = require('../controllers/aiController');
const multer = require("multer");

const aiRouter = express.Router();

console.log("Inside the ai router");
// const upload = multer({ storage: multer.memoryStorage() });

aiRouter.post('/transcribe', aiController.transcribeAudio);

module.exports = aiRouter;
