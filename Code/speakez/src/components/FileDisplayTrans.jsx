import React from "react";
import { useState } from "react";
import { AiOutlineClose } from 'react-icons/ai';
import './FileDisplayTrans.css';
import { ALL_LANGUAGES } from './LanguageSelection'


export default function FileDisplayTrans({result}) {  
    const [toLanguage, setToLanguage] = useState('Select language')
    const transcribedText = result?.text || (Array.isArray(result) && result.length > 0 ? result[0]?.text : '');
    
    return(
    <div className="FileDisplayTrans">
    <section className="translator">
        
            <div className="transcribedSection">
                <div className="top-row">
                    <button className="btn btn-primary btn-translate">
                        Translate
                    </button>
                </div>
                <form className="transcription-box">
                    <textarea className="text-box"
                    value={transcribedText}>

                    </textarea>
                </form>
            </div>          

            <div className="translatedSection">
                <div className="top-row">
                    <select value={toLanguage} className='top-row' onChange={(event) => setToLanguage(event.target.value)}>
                        <option value={'Select language'}>Select language</option>
                        {Object.entries(ALL_LANGUAGES).map(([key, value]) => {
                            return (
                                <option key={key} value={value}>{key}</option>
                            )
                        })}

                    </select>
                </div>
                <textarea className="text-box translate-box">
                    Select Language
                </textarea>
            </div>

    </section>
    </div>
    
  );
}
