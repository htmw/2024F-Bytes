// Using dynamic import
async function loadPipeline() {
  const { pipeline } = await import('@xenova/transformers');  // Dynamically import pipeline
  return pipeline;
}

// Simplified transcription pipeline class
class TranscriptionPipeline {
  static instance = null;

  // Get or create an instance of the pipeline
  static async getInstance() {
    if (this.instance === null) {
      try {
        const pipeline = await loadPipeline();  // Dynamically load the pipeline
        this.instance = await pipeline('automatic-speech-recognition', 'xenova/whisper-base');
      } catch (err) {
        console.error("Error initializing pipeline:", err);
      }
    }
    return this.instance;
  }

  // Function to handle the transcription process
  static async transcribe(audio) {
    console.log("Inside the transcribe function");
    try {
      const pipelineInstance = await this.getInstance();  // Get or create the pipeline instance

      const result = await pipelineInstance(audio, {
        top_k: 0, // Limits number of top results
        do_sample: false, // Disables sampling
        return_timestamps: true, // Returns timestamps for the transcription
      });

      return result;  // Return the transcription result

    } catch (error) {
      console.error("Error during transcription:", error);
      throw new Error("Transcription failed.");
    }
  }
}

// Export the entire TranscriptionPipeline class (to access both `getInstance` and `transcribe`)
module.exports = TranscriptionPipeline;
