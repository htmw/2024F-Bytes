import React from "react";

const LanguageSelection = ({ sourceLanguage, targetLanguage, onSourceChange, onTargetChange, onSwap, languages }) => {
  return (
    <section className="language-selection">
      <select id="sourceLanguage" className="language-button" value={sourceLanguage} onChange={onSourceChange}>
        {languages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.name}
          </option>
        ))}
      </select>
      <button className="arrows" id="swapButton" onClick={onSwap}>
        &#11138;
      </button>
      <select id="targetLanguage" className="language-button" value={targetLanguage} onChange={onTargetChange}>
        {languages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.name}
          </option>
        ))}
      </select>
    </section>
  );
};

export default LanguageSelection;
