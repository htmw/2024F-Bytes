import whisper
# import torch  
import librosa
import json
import sys
import os
from utils.language_mapping import translation_languages
from transformers import pipeline
import json

def transcribe_and_translate_audio(file_path):
    file_path = file_path.strip()
    
    model = whisper.load_model("base")
    
    # Load audio with librosa
    audio, sr = librosa.load(file_path, sr=16000)

    try:
        # Transcribe original audio
        transcription_result = model.transcribe(audio)
        original_text = transcription_result['text']
        
        # Translate the audio (optional task, may not always be available in every model)
        translation_result = model.transcribe(audio, task="translate")
        translated_text = translation_result['text']
        
    except Exception as e:
        # Return an error if transcription fails
        return {"error": f"Error during transcription/translation: {str(e)}"}

    return original_text, translated_text


def translate_text(text, source_lang, target_lang):
    translation_type = f"{source_lang} to {target_lang}"

    model_name = translation_languages.get(translation_type)
    if not model_name:
        # Return a structured failure response
        return {
            "success": False,
            "error": f"Translation type '{translation_type}' is not supported."
        }
    
    try:
        translator = pipeline('translation', model=model_name)
        translation_result = translator(text)
        # Return a structured success response
        return {
            "success": True,
            "translation": translation_result[0]['translation_text']
        }
    except Exception as e:
        # Handle any other exceptions and return a failure response
        return {
            "success": False,
            "error": str(e)
        }

if __name__ == "__main__":
    if "--text" in sys.argv:
        text_index = sys.argv.index("--text") + 1
        source_index = sys.argv.index("--source") + 1
        target_index = sys.argv.index("--target") + 1

        text = sys.argv[text_index]
        source_lang = sys.argv[source_index]
        target_lang = sys.argv[target_index]

        translated_text = translate_text(text, source_lang, target_lang)
        print(json.dumps(translated_text))
    else:
        file_path = sys.argv[1].strip()
        result = transcribe_and_translate_audio(file_path)

        # Handle potential error in transcription/translation
        if "error" in result:
            print(json.dumps({"error": result["error"]}))
        else:
            original_text, translated_text = result
            print(json.dumps({"transcription": original_text, "translation": translated_text, "english_translation": translated_text}))
        
        if os.path.exists(file_path):
            os.remove(file_path)
