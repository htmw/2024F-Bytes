// import React, { useState } from "react";
// import { AiOutlineCopy } from 'react-icons/ai';
// import './FileDisplayTrans.css';
// import { ALL_LANGUAGES } from './LanguageSelection';

// export default function FileDisplayTrans({ result }) {  
//     const [toLanguage, setToLanguage] = useState('Select language');
//     const transcribedText = result?.text || (Array.isArray(result) && result.length > 0 ? result[0]?.text : '');

//     // Function to copy the text from the textarea
//     const copyToClipboard = (text) => {
//         navigator.clipboard.writeText(text)
//             .then(() => {
//                 alert("Text copied to clipboard!"); // Optional: Notify the user
//             })
//             .catch(err => {
//                 console.error("Failed to copy: ", err); // Handle error
//             });
//     };

//     return (
//         <div className="FileDisplayTrans">
//             <section className="translator">
//                 {/* Transcribed Section */}
//                 <div className="transcribedSection">
//                     <div className="top-row">
//                         <button className="sign-in-button">
//                             Translate
//                         </button>
//                     </div>
//                     <form className="transcription-box">
//                         <div className="text-boxes"> {/* Use your existing styles */}
//                             <textarea
//                                 className="text-box"
//                                 value={transcribedText}
//                                 readOnly // Make it read-only to prevent editing
//                             />
//                         </div>
//                         <div style={{ marginTop: "10px", textAlign: "center" }}>
//                             <span style={{ marginRight: "5px" }}>Copy transcribed text:</span>
//                             <AiOutlineCopy 
//                                 className="copy-icon" 
//                                 onClick={() => copyToClipboard(transcribedText)} 
//                                 style={{ cursor: "pointer", fontSize: "20px" }} 
//                             />
//                         </div>
//                     </form>
//                 </div>

//                 {/* Translated Section */}
//                 <div className="translatedSection">
//                     <div className="top-row">
//                         <select 
//                             value={toLanguage} 
//                             className='sign-in-button' 
//                             onChange={(event) => setToLanguage(event.target.value)}
//                         >
//                             <option value={'Select language'}>Select language</option>
//                             {Object.entries(ALL_LANGUAGES).map(([key, value]) => {
//                                 return (
//                                     <option key={key} value={value}>{key}</option>
//                                 );
//                             })}
//                         </select>
//                     </div>
//                     <div className="text-boxes"> {/* Use your existing styles */}
//                         <textarea 
//                             className="text-box translate-box" 
//                             readOnly
//                         >
//                             Select Language
//                         </textarea>
//                     </div>
//                     <div style={{ marginTop: "10px", textAlign: "center" }}>
//                         <span style={{ marginRight: "5px" }}>Copy translated text:</span>
//                         <AiOutlineCopy 
//                             className="copy-icon" 
//                             onClick={() => copyToClipboard("Select Language")} // Change this to the actual translated text when available
//                             style={{ cursor: "pointer", fontSize: "20px" }} 
//                         />
//                     </div>
//                 </div>
//             </section>

//         </div>
//     );
// }


// NEW-/ PREVIOUS CODES ABOVE

import React, { useState } from "react";
import { AiOutlineCopy } from 'react-icons/ai';
import './FileDisplayTrans.css';
import { ALL_LANGUAGES } from './LanguageSelection';

export default function FileDisplayTrans({ result }) {  
    const [toLanguage, setToLanguage] = useState('Select language');
    const transcribedText = result?.text || (Array.isArray(result) && result.length > 0 ? result[0]?.text : '');

    // Function to copy the text from the textarea
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                alert("Text copied to clipboard!"); // Optional: Notify the user
            })
            .catch(err => {
                console.error("Failed to copy: ", err); // Handle error
            });
    };

    // NEW- Function to download the translated text
    const downloadTranslatedText = () => {
        const element = document.createElement("a");
        const file = new Blob([/* translated text here */], { type: "text/plain" });
        element.href = URL.createObjectURL(file);
        element.download = "translated_text.txt";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    return (
        <div className="FileDisplayTrans">
            <section className="translator">
                {/* Transcribed Section */}
                <div className="transcribedSection">
                    <div className="top-row">
                        <button className="sign-in-button">
                            Translate
                        </button>
                    </div>
                    <form className="transcription-box">
                        <div className="text-boxes"> {/* Use your existing styles */}
                            <textarea
                                className="text-box"
                                value={transcribedText}
                                readOnly // Make it read-only to prevent editing
                            />
                        </div>
                        <div style={{ marginTop: "10px", textAlign: "center" }}>
                            <span style={{ marginRight: "5px" }}>Copy transcribed text:</span>
                            <AiOutlineCopy 
                                className="copy-icon" 
                                onClick={() => copyToClipboard(transcribedText)} 
                                style={{ cursor: "pointer", fontSize: "20px" }} 
                            />
                        </div>
                    </form>
                </div>

                {/* Translated Section */}
                <div className="translatedSection">
                    <div className="top-row">
                        <select 
                            value={toLanguage} 
                            className='sign-in-button' 
                            onChange={(event) => setToLanguage(event.target.value)}
                        >
                            <option value={'Select language'}>Select language</option>
                            {Object.entries(ALL_LANGUAGES).map(([key, value]) => {
                                return (
                                    <option key={key} value={value}>{key}</option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="text-boxes"> {/* Use your existing styles */}
                        <textarea 
                            className="text-box translate-box" 
                            readOnly
                        >
                            Select Language
                        </textarea>
                    </div>
                    <div style={{ marginTop: "10px", textAlign: "center" }}>
                        <span style={{ marginRight: "5px" }}>Copy translated text:</span>
                        <AiOutlineCopy 
                            className="copy-icon" 
                            onClick={() => copyToClipboard("Select Language")} // Change this to the actual translated text when available
                            style={{ cursor: "pointer", fontSize: "20px" }} 
                        />
                    </div>
                </div>
            </section>

            {/* NEW - Download Button */}
            <div className="download-button-container">
                <button className="download-button" onClick={downloadTranslatedText}>
                    Download Translated Text
                </button>
            </div>
        </div>
    );
}

