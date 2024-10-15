import React from "react";

const LanguageSelection = () => {
  return (
    <section className="language-selection">
      <select id="sourceLanguage" className="language-button"></select>
      <button className="arrows" id="swapButton">
        &#11138;
      </button>
      <select id="targetLanguage" className="language-button"></select>
    </section>
  );
};

export default LanguageSelection;
