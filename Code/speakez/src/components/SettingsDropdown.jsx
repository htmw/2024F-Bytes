// NEW FILE
import React, { useState } from "react";
import "./SettingsDropdown.css";

// Define the SettingsDropdown component
const SettingsDropdown = () => {
   // State to manage whether the dropdown is open or closed
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null); // Track which option is selected

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option); // Set selected option for showing form
  };

  return (
    <div className="settings-container">
      <div className="settings-icon" onClick={toggleDropdown}>
        &#9776;
      </div>

      {/* Render dropdown menu items if dropdown is open */}
      {isOpen && (
        <div className="settings-dropdown">
          <ul>
            <li onClick={() => handleOptionClick("theme")}>Theme Selection</li>
            <li onClick={() => handleOptionClick("language")}>Language Preferences</li>
            <li onClick={() => handleOptionClick("help")}>Help & Support</li>
          </ul>

          {/* Conditionally render forms based on selected option */}
          {selectedOption === "theme" && (
            <div className="settings-form">
              <h3>Choose Theme</h3>
              <label>
                <input type="radio" name="theme" value="light" /> Light Mode
              </label>
              <label>
                <input type="radio" name="theme" value="dark" /> Dark Mode
              </label>
            </div>
          )}

          {selectedOption === "language" && (
            <div className="settings-form">
              <h3>Language Preferences</h3>
              <select>
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="es">Hindi</option>
                <option value="zh">Mandarin</option>
                <option value="hi">Spanish</option>
              </select>
            </div>
          )}

           {/* Conditionally render Help & Support section */}
          {selectedOption === "help" && (
            <div className="settings-form">
              <h3>Help & Support</h3>
              <p>For support, please contact us at speakEz@gmail.com</p>
              <p>Visit our <a href="/faq">FAQ</a> for common questions.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SettingsDropdown;


