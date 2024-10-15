import React from "react";

const TextBoxes = () => {
  return (
    <section className="text-boxes">
      <hr className="separator-line" />
      <textarea id="outputText" className="output-text" placeholder="We can show the output..." readOnly></textarea>
    </section>
  );
};

export default TextBoxes;
