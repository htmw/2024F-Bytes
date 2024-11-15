import whisper
import sys
import librosa
import json
import os

def transcribe_and_translate_audio(file_path):
    file_path = file_path.strip()
    model = whisper.load_model("base")
    
    audio, sr = librosa.load(file_path, sr=16000)

    transcription_result = model.transcribe(audio)
    original_text = transcription_result['text']
    
    translation_result = model.transcribe(audio, task="translate")
    translated_text = translation_result['text']
    
    return original_text, translated_text

if __name__ == "__main__":
    file_path = sys.argv[1].strip()

    original_text, translated_text = transcribe_and_translate_audio(file_path)

    print(json.dumps({"transcription": original_text, "translation": translated_text}))

    if os.path.exists(file_path):
        os.remove(file_path)
