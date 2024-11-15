import { env, pipeline } from "@xenova/transformers";
import { MessageTypes } from "./reference";
env.allowLocalModels = false;

class MyTranscriptionPipeline {
  static task = "automatic-speech-recognition";
  static model = "openai/whisper-tiny.en";
  static instance = null; // null to hold the instance of the pipeline

  // commnicate all the status with our main function // returns an instance of the pipeline
  static async getInstance(progress_callback = null) {
    if (this.instance === null) {
      // creates an instance by calling the pipeline function passing the task, model and optional callback to track loading progress
      this.instance = await pipeline(this.task, "Xenova/whisper-base", {
        progress_callback,
      });
    }
    //
    return this.instance;
  }
}

// we add the eventlistener to listen for messages that we send from the main file and processes the audio data by calling the transcribe function
self.addEventListener("message", async (event) => {
  const { type, audio } = event.data; //takes the type and audio from the incoming message data
  if (type === MessageTypes.INFERENCE_REQUEST) {
    await transcribe(audio);
  }
});

async function transcribe(audio) {
  sendLoadingMessage("loading");

  let pipeline;

  try {
    // attempts to get an instance of the pipeline of the transcription
    pipeline = await MyTranscriptionPipeline.getInstance(load_model_callback);
  } catch (err) {
    console.log(err.message);
  }

  sendLoadingMessage("success"); // pipeline ready

  const stride_length_s = 5; // duration audio data is processed, overlap between chunks
  const generationTracker = new GenerationTracker(pipeline, stride_length_s); //manage transcription process
  await pipeline(audio, {
    top_k: 0, //limits number of top results
    do_sample: false, //disables random sampling
    chunk_length: 30, //splits audio into 30 sec chunks
    stride_length_s, //defined duration processed, overlap between chunks
    return_timestamps: true, //timestamps in results
    callback_function:
      generationTracker.callbackFunction.bind(generationTracker),
    chunk_callback: generationTracker.chunkCallback.bind(generationTracker), //handle processing callbacks bound to generationTracker
  });
  generationTracker.sendFinalResult(); //final transcript result
}

//this function manages and communicates the progress of loading a model by sending updates whenever there's a progress change
async function load_model_callback(data) {
  const { status } = data;
  if (status === "progress") {
    const { file, progress, loaded, total } = data;
    sendDownloadingMessage(file, progress, loaded, total);
  }
}

// post back to the main thread, indicate if it is loading state and get the status
function sendLoadingMessage(status) {
  self.postMessage({
    type: MessageTypes.LOADING,
    status,
  });
}

// post messages back to the main thread to indicate if it is downloading
async function sendDownloadingMessage(file, progress, loaded, total) {
  self.postMessage({
    type: MessageTypes.DOWNLOADING,
    file,
    progress,
    loaded,
    total,
  });
}

// process and transcribe the audio chunks, returns final message of done
class GenerationTracker {
  constructor(pipeline, stride_length_s) {
    this.pipeline = pipeline;
    this.stride_length_s = stride_length_s;
    this.chunks = [];
    this.time_precision =
      pipeline?.processor.feature_extractor.config.chunk_length /
      pipeline.model.config.max_source_positions;
    this.processed_chunks = [];
    this.callbackFunctionCounter = 0;
  }

  //sends message when done
  sendFinalResult() {
    self.postMessage({ type: MessageTypes.INFERENCE_DONE });
  }

  // processes every 10th callback to decode the best beam. Beam search algorithm, to decode the sequence
  // generating multiple beams and keeps the top-performing beams to get the best possible output
  callbackFunction(beams) {
    this.callbackFunctionCounter += 1;
    if (this.callbackFunctionCounter % 10 !== 0) {
      return;
    }

    const bestBeam = beams[0];
    let text = this.pipeline.tokenizer.decode(bestBeam.output_token_ids, {
      skip_special_tokens: true,
    });

    const result = {
      text,
      start: this.getLastChunkTimestamp(),
      end: undefined,
    };

    createPartialResultMessage(result);
  }

  // decode the automatic speech recognition chunks
  chunkCallback(data) {
    // add data to the chunks array
    this.chunks.push(data);
    const [text, { chunks }] = this.pipeline.tokenizer._decode_asr(
      this.chunks,
      {
        time_precision: this.time_precision,
        return_timestamps: true,
        force_full_sequence: false,
      }
    );

    // process each chunk
    this.processed_chunks = chunks.map((chunk, index) => {
      return this.processChunk(chunk, index);
    });

    // create result messages from the processed chunks
    createResultMessage(
      this.processed_chunks,
      false,
      this.getLastChunkTimestamp()
    );
  }

  // timestamp of the last processed chunk or 0 if no chunks have been processed, called in the chunkCallBack function
  getLastChunkTimestamp() {
    if (this.processed_chunks.length === 0) {
      return 0;
    }
  }

  // text and timestamp takes from the chunk and process each chunk in the chunkCallback function
  processChunk(chunk, index) {
    const { text, timestamp } = chunk;
    const [start, end] = timestamp;

    return {
      index,
      text: text.trim(),
      start: Math.round(start),
      end: Math.round(end) || Math.round(start + 0.9 * this.stride_length_s),
    };
  }
}

// sends results message to the main thread
function createResultMessage(results, isDone, completedUntilTimestamp) {
  self.postMessage({
    type: MessageTypes.RESULT,
    results,
    isDone,
    completedUntilTimestamp,
  });
}

// sends partial result message to the main thread
function createPartialResultMessage(result) {
  self.postMessage({
    type: MessageTypes.RESULT_PARTIAL,
    result,
  });
}
