const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');

// Replace this with your Hugging Face API key
const API_KEY = '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'; 

const transcribeAudio = async (req, res) => {
    try {
        // Read the audio file from the request or a local path
        const audioFilePath = 'P:/Folder Mew/capstone codebase/2024F-Bytes/Code/server/audioTest/polish.mp3'; 
        const form = new FormData();
        form.append('file', fs.createReadStream(audioFilePath));

        // Call Hugging Face API to transcribe the audio
        const response = await axios.post(
            'https://api-inference.huggingface.co/models/openai/whisper-small',
            form,
            {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    ...form.getHeaders(),
                },
            }
        );

        // Assuming the response contains transcription text
        const transcription = response.data.text;

        // Send transcription result back to the client
        res.status(200).json({ output: transcription });
    } catch (error) {
        console.error('Error transcribing audio:', error.message);

        // Handle specific errors for better clarity
        if (error.code === 'ECONNRESET') {
            return res.status(500).json({ error: 'Connection error. Please try again later.' });
        }

        // General error handling
        res.status(500).json({ error: 'Transcription failed due to an internal error.' });
    }
};

module.exports = { transcribeAudio };
